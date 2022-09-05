import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Event from '../../../models/event.model'
import Notification from '../../../models/notification.model'
import eventTitleRender from '../../../utils/eventTitleRender'
import dayjs from 'dayjs'
import { pusher } from '../../../services/pusher/pusher'

export default async function cancelEvent(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  if(session.user?.profiles.length === 0)return res.status(403).send('non autorisé')
  await MongoDb()

  const eventToCancel = await Event.findById(validator.escape(req.body.eventId))
 
  eventToCancel.cancel = true
  await eventToCancel.save()

  console.log(eventToCancel.attendees)
  await Notification.create(eventToCancel.attendees.map((attendee:{userId:string})=>({
    userId: attendee.userId,
    type: 'event',
    text: `l'évenement ${eventTitleRender(eventToCancel)} du ${dayjs(eventToCancel.start).format('LL')} a été annulé.`,
    state: 'unread',
    url: '/calendrier',
    updatedAt: new Date(),
  })))

  eventToCancel.attendees.forEach((user:{userId:string}) => {
    pusher.trigger(user.userId + '-notification', 'message', {
      type: 'event',
    })
  })
  res.send('événement annulé !')
}
