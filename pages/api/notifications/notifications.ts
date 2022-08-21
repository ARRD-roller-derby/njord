import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Notification from '../../../models/notification.model'

export default async function notifications(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  await MongoDb()

  res.send(
    await Notification.find(
      { userId: session.user._id },
      null,
      req.body.limit ? { limit: req.body.limit,sort:{updatedAt: -1} } : {sort:{updatedAt: -1} }
    )
  )
}
