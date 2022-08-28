import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Event from '../../../models/event.model'

export default async function eventsNext(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()

  const OR = []

  const between = {
      start: {
        $gte: dayjs().set('hour',0).toISOString()
      },
    }

  OR.push({between,guests:session.user._id})

  if (session.user?.league.id) {
    OR.push(
      {between,leaguesGuest: session.user?.league.id},
      {between,leagueId: session.user?.league.id}
    )
  }

  res.json(await Event.find({OR}).sort({start: 1}).limit(10))
}
