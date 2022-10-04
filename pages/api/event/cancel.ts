import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Event from '../../../models/event.model'
import Notification from '../../../models/notification.model'
import eventTitleRender from '../../../utils/eventTitleRender'
import dayjs from 'dayjs'
import { pusher } from '../../../services/pusher/pusher'
import { UserInterface } from '../../../types/User.interface'
import { pushNotifications } from '../../../services/pusher/pusherBeams'

export default async function cancelEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  if (session.user?.profiles.length === 0)
    return res.status(403).send('non autorisé')
  await MongoDb()

  const eventToCancel = await Event.findById(validator.escape(req.body.eventId))

  eventToCancel.cancel = !eventToCancel.cancel
  await eventToCancel.save()

  const text = `l'évenement ${eventTitleRender(eventToCancel)} du ${dayjs(
    eventToCancel.start
  ).format('LL')} a été annulé.`
  await Notification.create(
    eventToCancel.attendees.map((attendee: { userId: string }) => ({
      userId: attendee.userId,
      type: 'event',
      text,
      state: 'unread',
      url: '/calendrier',
      updatedAt: new Date(),
    }))
  )

  eventToCancel.attendees.forEach((user: { userId: string }) => {
    pusher.trigger(user.userId + '-notification', 'message', {
      type: 'event',
    })
  })

  const publishToInterests = eventToCancel.attendees.map(
    (user: {userId:string}) => 'user-' + user.userId
  )

  pushNotifications.publishToInterests(publishToInterests, {
    web: {
      notification: {
        title: 'événement annulé !',
        deep_link: req.headers.origin + '/calendrier',
        body: text,
      },
    },
  })
  res.send(eventToCancel.cancel  ? 'événement annulé !':'événement rétabli !')
}
