import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Sponsor from '../../../models/sponsor.model';
import S3 from '../../../utils/bucket';
import { v4 as uuidv4 } from 'uuid'
import validator from 'validator'
import User from '../../../models/user.model';
import userNameRender from '../../../utils/userNameRender';

export default async function addSponsor(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const session = await getSession({ req })

  if (!req.body.logo) return res.status(400).send('Logo manquant')
  if (!req.body.name) return res.status(400).send('Nom manquant')

  if (!session?.isAdmin) return res.status(403).send('non autorisé')

  await MongoDb()

  const me = await User.findById(session.user._id);
  const canId = me.profiles.find((profile: string) => profile.match(/admin|bureau|orga/))
  if (!canId || !me.admin) return res.status(403).send('Non autorisé')

  const existSponsor = await Sponsor.findOne({ name: req.body.name })

  if (existSponsor) return res.status(400).send('Ce sponsor existe déjà')

  const users = await User.find({ _id: { $in: req.body.users } })

  const s3 = new S3();

  const link = await s3.sendImage(
    'logo_sponsor',
    req.body.logo,
    uuidv4(),
    'logo_sponsor'
  )
  const sponsor = {
    name: validator.escape(req.body.name),
    logo: link,
    link: validator.isURL(req.body.link) ? req.body.link : '',
    description: validator.escape(req.body.description),
    users: users.map((user) => ({
      name: userNameRender(user),
      id: user._id.toString(),
    })),
  }
  res.json(await Sponsor.create(sponsor))
}
