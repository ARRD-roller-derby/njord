import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Item from '../../../models/item.model'
import { ItemOwnerType } from '../../../types/items.interface'

export default async function itemDelete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()
  console.log(req.body)
  const item = await Item.findById(validator.escape(req.body._id))

  if (!item) return res.status(404).send('Objet non trouvé')

  if (
    item.ownerType === ItemOwnerType.user &&
    item.ownerId !== session.user._id
  )
    return res.status(403).send('non autorisé')

  if (item.ownerType === ItemOwnerType.league  && session.user.profiles.length === 0)
    res.status(403).send('non autorisé')

  await item.delete()
  res.send('Objet supprimé')
}
