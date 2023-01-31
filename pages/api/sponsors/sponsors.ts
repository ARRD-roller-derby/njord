import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Sponsor from '../../../models/sponsor.model';
import User from '../../../models/user.model';

export default async function sponsors(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  const { page } = req.body

  await MongoDb()
  const me = await User.findById(session.user._id);
  const canId = me.profiles.find((profile: string) => profile.match(/admin|bureau|orga/))
  if (!canId || !me.admin) return res.status(403).send('Non autorisé')

  const perPage = 10
  const totalSponsors = await Sponsor.count()

  const sponsors = await Sponsor.find().skip(page > 1 ? page * perPage - perPage : 0).limit(perPage).sort({ name: -1 })

  res.json({
    sponsors,
    totalPage: Math.ceil(totalSponsors / perPage)
  })
}