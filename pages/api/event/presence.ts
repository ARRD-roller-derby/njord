import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import { pusher } from '../../../services/pusher/pusher'
import { EventType } from '../../../types/EventType.enum'
import User from '../../../models/user.model'
import Event, { Attendee } from '../../../models/event.model'
import { AttendeesEventInterface } from '../../../types/Event.interface'

export default async function presence(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')
  if (
    !session.user?.profiles.find((profile: string) =>
      profile.match(/bureau|coach|com|fest/)
    )
  )
    return res.status(403).send('non autorisé')
  await MongoDb()

  if (!req.body.eventId)
    return res.status(400).send("Il manque l'id de l'événement")

  const isPresent = typeof req.body?.type === 'boolean' ? req.body.type : false

  const event = await Event.findOne({
    $or: [
      { _id: validator.escape(req.body.eventId),leaguesGuest: session.user?.league.id },
      { _id: validator.escape(req.body.eventId),leagueId: session.user?.league.id },
    ],
  })

  if (!event)
    return res
      .status(403)
      .send("Vous n'avez pas l'autorisation de faire cette action")

  const myPresence = event.attendees?.find(
    (attendee: AttendeesEventInterface) => attendee.userId === session.user._id
  )

  if (myPresence) {
    event.attendees.id(myPresence._id).remove()
  }

  event.attendees.push({
    userId: session.user._id.toString(),
    isPresent:isPresent,
    updatedAt: new Date(),
  })

  await event.save()

  const users = await User.find({
    $or: [
      {
        'league.id': session.user.league.id,
      },
      {
        'league.id': {
          $in: event.leaguesGuest,
        },
      },
      {
        id: {
          $in: event.guests,
        },
      },
    ],
  })

  users.forEach((user) => {
    pusher.trigger(user._id + '-notification', 'message', {
      type: 'event',
      id: event._id,
    })
  })

  res.send('Présence mise à jour')
}
