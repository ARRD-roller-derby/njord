import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'

export default async function wallet(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  await MongoDb()
  const me = await User.findById(session.user._id,{wallet: 1});
  res.json(me.wallet || 0)
}