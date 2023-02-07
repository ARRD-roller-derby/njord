import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import validator from 'validator'
import Sponsor from '../../../models/sponsor.model'
import trigger from '../../../services/bifrost/trigger'
import { TriggerEvents } from '../../../types/trigger-events.enum'
import userNameRender from '../../../utils/userNameRender'
import { v4 as uuidv4 } from 'uuid'
import S3 from '../../../utils/bucket';

export default async function updateField(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req }),
    { field, value, id } = req.body

  if (!session) return res.status(403).send('Non autorisé')
  if (!field || !id) return res.status(400).send('Champs manquant')

  await MongoDb()

  const me = await User.findById(session.user._id);
  const canIUpdateThisField = me.profiles.find((profile: string) => profile.match(/admin|bureau|orga/))
  if (!canIUpdateThisField || !me.admin) return res.status(403).send('Non autorisé')

  const sponsor = await Sponsor.findById(validator.escape(id))


  if (field === 'logo') {
    const s3 = new S3();
    const link = await s3.sendImage(
      'logo_sponsor',
      req.body.value,
      uuidv4(),
      'logo_sponsor'
    )

    sponsor[field] = link
  } else {

    sponsor[field] = typeof value === 'string' && field !== 'logo' && field !== 'link' ? validator.escape(value) : value
  }


  if (field === 'users') {
    const users = await User.find({ _id: { $in: value } })

    sponsor.users = users.map((user) => ({
      name: userNameRender(user),
      id: user._id.toString(),
    }))
  }

  await sponsor.save()

  trigger('public', { type: TriggerEvents.sponsors })

  res.send('sponsor mis à jour')
}
