import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Event from '../../../models/event.model'
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
      $gte: dayjs().subtract(1, 'day').format('YYYY-MM-DD')
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

  const { page } = req.body || 1

  const perPage = 12

  const totalEvents = await Event.count({ $or: OR })

  const events = await Event.find({ $or: OR }).skip(page > 1 ? page * perPage - perPage : 0).limit(perPage).sort({ start: 1 }),
    eventsWithPresence = []

  for (const event of events) {
    eventsWithPresence.push(await eventWithPresence(session.user._id, event))
  }

  res.json({
    events: eventsWithPresence,
    totalPage: Math.ceil(totalEvents / perPage)
  })
}
