import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import User from '../../../models/user.model'
import Event from '../../../models/event.model'
import { AttendeesEventInterface } from '../../../types/Event.interface'
import trigger from '../../../services/bifrost/trigger'
import { TriggerEvents } from '../../../types/trigger-events.enum'

export default async function presence(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')
  await MongoDb()

  if (!req.body.eventId)
    return res.status(400).send("Il manque l'id de l'événement")

  const isPresent = typeof req.body?.type === 'boolean' ? req.body.type : false

  const OR: any = [
    { _id: validator.escape(req.body.eventId), visibility: 'public' }
  ]

  if (session.user?.league?.id) {
    OR.push({
      _id: validator.escape(req.body.eventId),
      leaguesGuest: session.user?.league.id,
    },
      {
        _id: validator.escape(req.body.eventId),
        leagueId: session.user?.league.id,
      })
  }
  const event = await Event.findOne({ $or: OR })

  if (!event)
    return res
      .status(403)
      .send("Vous n'avez pas l'autorisation de faire cette action")

  const myPresence = event.attendees?.find(
    (attendee: AttendeesEventInterface) => attendee.userId === session.user._id
  )

  if (myPresence) {
    await event.attendees.id(myPresence._id).remove()
  } else {
    //ADD TO WALLET FOR THE FIRST 
    const user = await User.findById(session.user._id)
    user.wallet += 50
    await user.save()
    trigger(user._id, { type: TriggerEvents.wallet })
  }

  event.attendees.push({
    userId: session.user._id.toString(),
    isPresent: isPresent ? true : false,
    guestNumber: isPresent && req.body.guestNumber ? validator.escape(req.body.guestNumber.toString()) : 1,
    updatedAt: new Date(),
  })

  await event.save()

  const ORUsers: any = [{
    id: {
      $in: event.guests,
    },
  }]

  if (session.user?.league?.id) {
    ORUsers.push(
      {
        'league.id': session.user.league.id,
      },
      {
        'league.id': {
          $in: event.leaguesGuest,
        },
      }
    )
  }

  res.send('Présence mise à jour')
}
