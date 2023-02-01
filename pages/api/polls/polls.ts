import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Poll from '../../../models/poll.model'

export default async function questionsAll(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session?.isAdmin || !session?.admin_game) return res.status(403).send('non autorisé')

  const { page } = req.body

  await MongoDb()

  const perPage = 10
  const totalPolls = await Poll.count()

  const canPoll = !!session.user?.profiles.find((profile: string) => profile.match(/bureau|admin|orga/));

  res.json({
    polls: await Poll.find().skip(page > 1 ? page * perPage - perPage : 0).limit(perPage).sort({ updatedAt: -1 }),
    canPoll,
    totalPage: Math.ceil(totalPolls / perPage)
  })
}