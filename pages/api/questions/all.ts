import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Question from '../../../models/question.model'

export default async function questionsAll(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  if (!session.isAdmin) return res.status(403).send('non autorisé')
  const { page } = req.body

  await MongoDb()
  const perPage = 10

  const totalQuestions = await Question.count()

  res.json({
    questions: await Question.find().skip(page > 1 ? page * perPage - perPage : 0).limit(perPage).sort({ updatedAt: -1 }),
    totalPage: Math.ceil(totalQuestions / perPage)
  })
}