import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import validator from 'validator'
import banLeague from '../../../services/league/ban'
import updateProfiles from '../../../services/league/updateProfiles'

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
    canIUpdateThisField = me.canIUpdateThisField(validator.escape(userId), field)

  if (!canIUpdateThisField) return res.status(403).send('Non autorisé')

  if (field === 'profiles') {
    const user = await updateProfiles(validator.escape(userId), session.user, value)
    return res.send(user)
  }

  if (field === 'league' && !value) return res.send('ok')

  if (field === 'league' && value) {
    const user = await banLeague(validator.escape(userId), session.user)
    return res.send(user)
  }

  const userToEdit = await User.findById(validator.escape(userId))
  userToEdit[field] =
    typeof value === 'string' ? validator.escape(value) : value
  await userToEdit.save()
  res.send(userToEdit)

  res.send('Mise à jour effectuée')
}
