import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Notification from '../../../models/notification.model'
import dto from '../../../utils/dto'
import { pusher } from '../../../services/pusher/pusher'
import validator from 'validator'

export default async function notifications(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  
  const form = dto<{ id: string }>(
    {
      id: {
        type: 'string',
        isRequired: true,
      },
    },
    req.body
  )

  await MongoDb()
  const notification = await Notification.findById(validator.escape(form.id))

  //check if good person for this action
  if (notification.userId !== session.user._id)
    return res.status(403).send('non autorisé')

  await notification.delete()

  pusher.trigger(session.user._id + '-notification', 'message', {
    type: 'notifications',
    value: 'refresh',
  })

  res.send('Notification effacée')
}
