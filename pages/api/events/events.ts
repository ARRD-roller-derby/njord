import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Event from '../../../models/event.model'
import eventWithPresence from '../../../utils/eventWithPresence'

export default async function events(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()

  const OR = []

  const betweenValue = req.body?.between
    ? req.body.between
    : [dayjs().toISOString(), dayjs().add(1, 'month').toISOString()];

  const
    between = {
      start: {
        $gte: validator.escape(betweenValue[0]),
        $lte: validator.escape(betweenValue[1]),
      },
    }

  OR.push(
    { ...between, guests: session.user._id },
    { ...between, visibility: 'public' }
  )

  if (session.user?.league?.id) {
    OR.push(
      { ...between, leaguesGuest: session.user?.league.id },
      { ...between, leagueId: session.user?.league.id }
    )
  }

  const events = await Event.find({ $or: OR }),
    eventsWithPresence = []


  for (const event of events) {
    eventsWithPresence.push(await eventWithPresence(session.user._id, event))
  }

  res.json(eventsWithPresence)
}
