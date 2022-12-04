import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Notification from '../../../models/notification.model'
import Request from '../../../models/request.model'

export default async function notifications(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  await MongoDb()
  const {page} = req.body
  const perPage = 10

  const where = { userId: session.user._id }
  const totalNotifications = await Notification.count(where)

  res.json({
    notifications: await Notification.find(where).skip(page > 1 ? page * perPage - perPage: 0).limit(perPage).sort({ updatedAt: -1 }),
    //no pagination for requests
    requests: await Request.find(where).limit(10).sort({ updatedAt: -1 }),
    totalPage: Math.ceil(totalNotifications / perPage)
  })
}
