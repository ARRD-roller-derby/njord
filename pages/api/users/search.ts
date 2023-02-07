import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import validator from 'validator'

export default async function search(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  await MongoDb()
  const { search } = req.body
  const regex = new RegExp(validator.escape(search), 'i')
  const where = {}
  if (search) {
    where['$or'] = [
      { name: { $regex: regex } },
      { lastname: { $regex: regex } },
      { derbyName: { $regex: regex } },
      { email: { $regex: regex } },
    ]
  }
  if (!session.user.admin) where['$and'] = {
    'league.id': session.user.league.id
  }

  const users = await User.find(where).sort({ lastname: 1 }).limit(search ? 10 : 100)

  res.json(users)
}
