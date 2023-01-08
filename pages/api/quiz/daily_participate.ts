import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Question from '../../../models/question.model'
import Quiz from '../../../models/quiz.model'
import validator from 'validator'
import RankingQuiz from '../../../models/ranking-quiz.model'
import { shuffle } from '../../../utils/shuffle'
import { IAnswer } from '../../../types/question.interface'

export default async function quizDailyParticipate(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()

  const quiz = await Quiz.findById(validator.escape(req?.body?.contestId))
  if (!quiz) return res.status(404).send('Quizz non trouvé')

  const questionsUnshuffle = await Question.find({
    _id: {
      $in: quiz.questions,
    },
  })

  const questions = questionsUnshuffle.map(question => ({
    _id: question._id,
    question: question.question,
    img: question?.img,
    percent: question.good_answers_num ?? 0 / question.bad_answers_num ?? 0 * 100,
    choices: shuffle(question.answers.map((answer: IAnswer) => answer.answer), question.answers.length + 1),
    multiChoice: question.answers.filter((answer: IAnswer) => answer.type === "good").length > 1,
  }))

  const existRanking = await RankingQuiz.findOne({
    quizId: validator.escape(req?.body?.contestId),
    userId: session.user._id,
  })

  if (existRanking.end) return res.status(403).send('Vous avez déjà participé à ce quizz')

  if (!existRanking) {
    const ranking = await RankingQuiz.create({
      quizId: validator.escape(req?.body?.contestId),
      userId: session.user._id,
      start: new Date()
    })
    return res.json({ questions, ranking })
  }


  return res.json({ questions, ranking: existRanking })
}
