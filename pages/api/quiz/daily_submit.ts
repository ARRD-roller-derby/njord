import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Question from '../../../models/question.model'
import validator from 'validator'
import RankingQuiz from '../../../models/ranking-quiz.model'
import User from '../../../models/user.model'
import dayjs from 'dayjs'
import trigger from '../../../services/bifrost/trigger'
import { TriggerEvents } from '../../../types/trigger-events.enum'
import { QuestionInterface } from '../../../types/question.interface'
import { getReadTime } from '../../../utils/get-read-time'

export default async function quizDailySubmit(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()
  const ranking = await RankingQuiz.findOne({
    quizId: validator.escape(req?.body?.contestId),
    userId: session.user._id
  })

  if (!ranking) return res.status(404).send('Quizz non trouvé')

  //before operation, end timer.
  ranking.end = new Date();

  const questions = await Question.find({
    _id: {
      $in: req?.body?.answers.map((answer: { id: string }) => validator.escape(answer.id)),
    },
  })


  const words = questions.reduce((acc: string[], question: QuestionInterface) => {
    acc.push(...question.question.split(' '))
    question.answers.forEach((answer: { answer: string }) => {
      acc.push(...answer.answer.split(' '))
    })
    return acc
  }, [])

  const readTime = getReadTime(words.join(' '))

  const countMyGoodAnswers = req.body.answers.reduce((acc: number, { answer, id }) => {
    //search question
    const question = questions.find(question => question._id.toString() === id)

    //extract good answers
    const orignalGoodAnswers = question.answers.filter((orignalAnswer: { type: string }) => orignalAnswer.type === 'good')
    //count good answers
    const originalGoodAnswersCount = orignalGoodAnswers.length
    //count my good answers
    const countMyGoodAnswers = answer.filter((myAnswer: string) => orignalGoodAnswers.find((orignalAnswer: { answer: string }) => orignalAnswer.answer === myAnswer)).length
    //if my good answers is equal to original good answers, add 1 to acc

    // save logs for each question
    if (countMyGoodAnswers === originalGoodAnswersCount) {
      question.good_answers_num = question.good_answers_num + 1
      return acc + 1
    } else {
      question.bad_answers_num = question.bad_answers_num + 1
    }
    question.save()
    return acc
  }, 0)


  const me = await User.findById(session.user._id)
  me.wallet += countMyGoodAnswers * 10

  if (countMyGoodAnswers === questions.length * 2) {
    me.wallet += 100
  }

  ranking.percent = countMyGoodAnswers / questions.length * 100;

  const diffSeconds = dayjs(ranking.end).diff(dayjs(ranking.start), 'second')
  //little score is good score
  ranking.score = (countMyGoodAnswers * 3600 * readTime) - diffSeconds
  ranking.speed = diffSeconds * readTime

  me.dailyContestAvgTime = me?.dailyContestAvgTime ? (me.dailyContestAvgTime + ranking.speed) / 2 : ranking.speed
  me.dailyContestAvgAccuracy = me?.dailyContestAvgAccuracy ? (me.dailyContestAvgAccuracy + ranking.percent) / 2 : ranking.percent
  me.lastDailyContest = new Date()

  await me.save()
  await ranking.save()


  trigger(session.user._id, { type: TriggerEvents.wallet })
  trigger('public', { type: TriggerEvents.daily_contest })

  return res.json({
    percent: ranking.percent.toFixed(0),
    responses: questions.map(question => ({
      id: question._id.toString(),
      answers: question.answers.filter((answer: { type: string }) => answer.type === 'good').map((answer: { answer: string[] }) => answer.answer),
    })),
  })
}
