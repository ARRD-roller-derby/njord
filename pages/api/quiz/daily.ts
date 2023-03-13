import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Quiz from '../../../models/quiz.model'
import RankingQuiz from '../../../models/ranking-quiz.model'
import { QuizType } from '../../../types/quiz.interface'
import { createDailyQuiz } from '../../../utils/create-daily-quiz'

export default async function quizDaily(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()
  // rechercher ou creer 
  const existDailyQuiz = await Quiz.findOne({
    type: QuizType.daily,
    day: dayjs().format('YYYY-MM-DD')
  })

  if (existDailyQuiz) {
    const existRanking = await RankingQuiz.findOne({
      quizId: existDailyQuiz._id,
      userId: session.user._id,
    }).select('end')

    return res.json({ quiz: { difficulty: existDailyQuiz.difficulty, type: existDailyQuiz.type, day: existDailyQuiz.day, _id: existDailyQuiz._id }, cantPlay: !!existRanking?.end })
  }

  const quiz = await createDailyQuiz()

  return res.json({ quiz: { difficulty: quiz.difficulty, type: quiz.type, day: quiz.day, _id: quiz._id }, cantPlay: false })

}
