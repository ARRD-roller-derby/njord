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

  const goodAnswers = questions.filter(question => !!req.body.answers.find((answer: { id: string, answer: string }) => answer.id === question._id.toString() && answer.answer === question.good_answers))

  const me = await User.findById(session.user._id)

  const money = goodAnswers.length * 25
  me.wallet += money

  if (goodAnswers.length === questions.length) {
    me.wallet += 100
  }

  ranking.percent = goodAnswers.length / questions.length * 100;
  //little score is good score
  ranking.score = parseFloat(`${questions.length - goodAnswers.length}.${dayjs(ranking.end).diff(dayjs(ranking.start), 'second')}`)

  await me.save()
  await ranking.save()

  trigger('public', { type: TriggerEvents.daily_contest })
  trigger(session.user._id, { type: TriggerEvents.wallet })

  questions.forEach(question => {
    const isGood = goodAnswers.find(q => question._id.toString() === q._id.toString())
    if (isGood) {
      question.good_answers_num = question.good_answers_num + 1
    } else {
      question.bad_answers_num = question.bad_answers_num + 1
    }
    question.save()
  })

  return res.json({
    percent: ranking.percent.toFixed(0),
    responses: questions.map(question => question.good_answers)
  })
}
