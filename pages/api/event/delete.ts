import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Event from '../../../models/event.model'
import trigger from '../../../services/bifrost/trigger'
import { TriggerEvents } from '../../../types/trigger-events.enum'

export default async function deleteEvent(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  if (!session.user?.profiles.find((profile: string) =>
    profile.match(/bureau|coach|com|fest|orga|merch/)
  )) return res.status(403).send('non autorisé')
  await MongoDb()

  const eventToDelete = await Event.findById(validator.escape(req.body.eventId))
  if (!eventToDelete) return res.send('déjà effacé')
  await eventToDelete.delete()

  trigger('public', {
    type: TriggerEvents.event,
    eventId: req.body.eventId
  })

  res.send('événement supprimé !')
}
