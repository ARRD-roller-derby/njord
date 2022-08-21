import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import validator from 'validator'

export default async function updateMyField(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req }),
    { field, value } = req.body

  if (!field) return res.status(400).send('Champs manquant')
  if (!session) return res.status(403).send('Non autorisé')

  const editableFields = [
    'email',
    'avatar',
    'name',
    'lastname',
    'emailVisibility',
    'phone',
    'phoneVisibility',
    'addressVisibility',
    'notificationPrefs',
    'numLicence',
    'pronoun',
    'birthDate',
    'numRoster',
    'derbyName',
    'allergies',
  ]
  if (!editableFields.find((editableField) => editableField === validator.escape(field)))
    return res.status(403).send('Non autorisé')

  await MongoDb()

  const userToEdit = await User.findById(session.user._id)
  userToEdit[field] = typeof value === 'string' ? validator.escape(value):value
  await userToEdit.save()
  res.send(userToEdit)
}
