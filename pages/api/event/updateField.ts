import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import validator from 'validator'
import Event from '../../../models/event.model'

export default async function updateField(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req }),
    { userId, field, value } = req.body

  if (!userId || !field) return res.status(400).send('Champs manquant')

  if (!session) return res.status(403).send('Non autorisé')

  await MongoDb()

  const me = await User.findById(session.user._id),
  //All profile can be touch event
    canIUpdateThisField = me.profiles.length > 0

  if (!canIUpdateThisField) return res.status(403).send('Non autorisé')

  const event = await Event.findById(validator.escape(req.body.id))

  
  event[req.body.field]= typeof value === 'string' ? validator.escape(req.body.value):req.body.value

  if(req.body.field === 'start' && event.type.match(/training|match|scrimmage|AG/) && typeof value !== 'string'){
    event.end = value
  }
  await event.save()

  res.send('événement mis à jour')
}
