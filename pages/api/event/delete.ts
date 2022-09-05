import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Event from '../../../models/event.model'

export default async function deleteEvent(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  if(session.user?.profiles.length === 0)return res.status(403).send('non autorisé')
  await MongoDb()

  const eventToDelete = await Event.findById(validator.escape(req.body.eventId))
  await eventToDelete.delete()
  res.send('événement supprimé !')
}
