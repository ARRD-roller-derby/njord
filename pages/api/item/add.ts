import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Item from '../../../models/item.model'
import { ItemLocalizationType } from '../../../types/items.interface'
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

  const isExist = await Item.findOne({ ownerId: session.user._id, name, type })

  console.log(isExist)
  if (isExist) return res.status(400).send('Cette objet existe déjà')

  const item = await Item.create({
    name,
    ownerType: type,
    ownerId: session.user._id,
    localization: {
      type: ItemLocalizationType.user,
      id: session.user._id,
      name: userNameRender(session.user),
    },
  })

  res.json(item)
}
