import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import { pusher } from '../../../services/pusher/pusher'
import User from '../../../models/user.model'
import Event from '../../../models/event.model'
import { AttendeesEventInterface } from '../../../types/Event.interface'

export default async function presenceType(
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
  if (!req.body.type)
    return res.status(400).send('Il manque le type de présence')

  const presence = validator.escape(req.body.type)

  const event = await Event.findOne({
    $or: [
      {
        _id: validator.escape(req.body.eventId),
        leaguesGuest: session.user?.league.id,
      },
      {
        _id: validator.escape(req.body.eventId),
        leagueId: session.user?.league.id,
      },
    ],
  })

  if (!event)
    return res
      .status(403)
      .send("Vous n'avez pas l'autorisation de faire cette action")

  const myPresence = event.attendees?.find(
    (attendee: AttendeesEventInterface) => attendee.userId === session.user._id
  )

  if (!myPresence)
    return res.status(404).send("Vous n'avez pas renseigné votre venue")

  event.attendees.id(myPresence._id).type = presence
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
