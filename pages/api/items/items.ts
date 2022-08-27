import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Item from '../../../models/item.model';

export default async function items(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  await MongoDb()
  //TODO, limiter les items en fonction du wallet.
  res.json(await Item.find({$or:[
    {
      ownerId: session.user._id
    },
    {
      'localization.type':'user',
      'localization.id':session.user._id,
    }
  ]}))
}