import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Item from '../../../models/item.model';
import validator from 'validator';

export default async function itemsSearch(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  await MongoDb()
  const regex = new RegExp(validator.escape(req.body.search),'i')
  res.json(await Item.find({
        name:{$regex:regex },
        $or:[
          {
            ownerId: session.user._id
          },
          {
            ownerId: session.user?.league?.id
          },
          {
            'localization.type':'user',
            'localization.id':session.user._id,
          }
    ]
  }).limit(10)
  )
}