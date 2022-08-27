import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Item from '../../../models/item.model'
import { ItemLocalizationType, ItemOwnerType } from '../../../types/items.interface';
import userNameRender from '../../../utils/userNameRender'

export default async function itemAdd(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  if (!req.body?.type || !req.body?.label)
    return res.status(400).send('Il manque des informations')
  await MongoDb()

  const type = validator.escape(req.body.type),
    name = validator.escape(req.body.label)

  if (type === ItemOwnerType.league && session.user.profiles.length === 0) 
    return res.status(403).send('Impossible d\'ajouter un objet à la league')
  const isExist = await Item.findOne({ ownerId: session.user._id, name, type })

  if (isExist) return res.status(400).send('Cette objet existe déjà')

  const item = await Item.create({
    name,
    ownerType: type,
    ownerId: type === ItemOwnerType.user ? session.user._id:session.user.league.id,
    localization: {
      type: ItemLocalizationType.user,
      id: session.user._id,
      name: userNameRender(session.user),
    },
  })

  res.json(item)
}
