import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Event from '../../../models/event.model'
import searchTypeOfPresence from '../../../utils/searchTypeOfPresence'
import { AttendeeInterface } from '../../../types/attendee.interface'
import eventWithPresence from '../../../utils/eventWithPresence'

export default async function eventsNext(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()

  const OR = []

  const between = {
    start: {
      $gte: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
      $lt: dayjs().add(1, 'month').format('YYYY-MM-DD'),
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

  const events = await Event.find({ $or: OR }).sort({ start: 1 }),
    eventsWithPresence = events.map((event) => {
     return eventWithPresence(session.user._id,event)
    })

  res.json(eventsWithPresence)
}
