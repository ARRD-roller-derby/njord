import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Address from '../../../models/adresses.model';
import validator from 'validator';

export default async function addressDelete(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()

  await Address.deleteMany({ownerId:session.user._id,_id:validator.escape(req.body._id)})

  res.json('addresse effacée')
}