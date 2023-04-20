import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Event from '../../../models/event.model'
import eventWithPresence from '../../../utils/eventWithPresence'

export default async function event(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()

  const
    OR = [],
    id = validator.escape(req.body.id)

  OR.push({ _id: id, guests: session.user._id }, { type: 'public' })

  if (session.user?.league?.id) {
    OR.push(
      { _id: id, leaguesGuest: session.user?.league.id },
      { _id: id, leagueId: session.user?.league.id }
    )
  }

  res.json(await eventWithPresence(session.user._id, await Event.findOne({ $or: OR })))
}
