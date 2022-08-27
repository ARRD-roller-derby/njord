import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Item from '../../../models/item.model'
import { ItemOwnerType } from '../../../types/items.interface'

export default async function itemUpdate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')
  if (!req.body.field) return res.status(400).send('Il manque le champ')

  await MongoDb()
  const item = await Item.findById(req.body.id)

  if (!item) return res.status(404).send('Objet non trouvé')

  if (
    item.ownerType === ItemOwnerType.user &&
    item.ownerId !== session.user._id
  )
    return res.status(403).send('non autorisé')

  if (req.body.field === 'ownerType') {
    if (session.user.profiles.length === 0)
      return res.status(403).send('non autorisé')
    if (!session.user?.league?.id) return res.status(403).send('non autorisé')
    item.ownerId = session.user.league.id
  }

  item[req.body.field] = validator.escape(req.body.value)

  await item.save()

  res.send('Objet mise à jour')
}
