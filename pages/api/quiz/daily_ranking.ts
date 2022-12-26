import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Quiz from '../../../models/quiz.model'
import RankingQuiz from '../../../models/ranking-quiz.model'
import User from '../../../models/user.model'
import { QuizType } from '../../../types/quiz.interface'

export default async function quizRanking(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  const { page } = req.body

  await MongoDb()

  const perPage = 50
  const quiz = await Quiz.findOne({
    type: QuizType.daily,
    day: dayjs().subtract(parseInt(req.body.date), 'day').format('YYYY-MM-DD')
  })

  if (!quiz) return res.status(404).send('Quiz non trouvé')

  const totalParticipate = await RankingQuiz.count({ quizId: quiz._id })
  const rankingResults = await RankingQuiz.find({ quizId: quiz._id }).skip(page > 1 ? page * perPage - perPage : 0).limit(perPage).sort({ score: 1 })
  const users = await User.find({ _id: { $in: rankingResults.map(rank => rank.userId) } })

  const ranking = rankingResults.reduce((val, current) => {
    val.push({
      ranking: current,
      user: users.find(user => user._id.toString() === current.userId)
    })
    return val
  }, [])

  res.json({
    ranking,
    totalPage: Math.ceil(totalParticipate / perPage)
  })

}
