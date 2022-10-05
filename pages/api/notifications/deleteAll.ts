import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Notification from '../../../models/notification.model'
import trigger from '../../../services/bifrost/trigger'

export default async function deleteAll(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  await MongoDb()

  await Notification.deleteMany({userId:session.user._id},{state: 'read'})

  trigger(session.user._id,{
    type: 'readNotification',
    value: 'refresh',
  })

  res.send('Notification effacée')
}
