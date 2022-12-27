import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { availableFeatures } from '../../../datasources/availableFeatures'
import { MongoDb } from '../../../db/mongo.connect'
import Feature from '../../../models/feature.model'
import validator from 'validator'
import User from '../../../models/user.model'
import trigger from '../../../services/bifrost/trigger'
import { TriggerEvents } from '../../../types/trigger-events.enum';

export default async function attendees(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  if (!req.body.name) return res.status(400).send('Il manque des informations')

  const
    name = validator.escape(req.body.name),
    feature = availableFeatures.find(availableFeature => availableFeature.name === name)

  if (!feature) return res.status(404).send('Feature inconnue')

  await MongoDb()

  const user = await User.findById(session.user._id)

  if (feature.cost > user.wallet) return res.status(400).send("Vous n'avez pas assez de dragons")

  const existFeat = await Feature.findOne({
    userId: user._id,
    name
  })

  if (existFeat) await existFeat.delete()

  const createBody: { name: string, userId: string, updatedAt: Date, exp?: Date } = {
    name,
    userId: user._id,
    updatedAt: new Date(),

  }

  if (feature.exp && feature.exp.scale !== 'shot') createBody.exp = dayjs().add(feature.exp.delay, feature.exp.scale).add(2, 'hour').toDate()

  await Feature.create(createBody)
  user.wallet -= feature.cost
  await user.save()

  trigger(user._id, { type: TriggerEvents.wallet })
  trigger(user._id, { type: 'event' })

  res.send('Merci pour cet achat !')
}
