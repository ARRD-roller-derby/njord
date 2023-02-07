import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator';
import User from '../../../models/user.model';
import Sponsor from '../../../models/sponsor.model';

export default async function sponsorsSearch(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()
  const me = await User.findById(session.user._id);
  const canId = me.profiles.find((profile: string) => profile.match(/admin|bureau|orga/))
  if (!canId || !me.admin) return res.status(403).send('Non autorisé')

  const regex = new RegExp(validator.escape(req.body.search), 'i')
  res.json(await Sponsor.find({
    name: { $regex: regex }
  }).limit(10)
  )
}