import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import validator from 'validator'
import Sponsor from '../../../models/sponsor.model'
import trigger from '../../../services/bifrost/trigger'
import { TriggerEvents } from '../../../types/trigger-events.enum'

export default async function deleteSponsor(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req }),
    { id } = req.body

  if (!session) return res.status(403).send('Non autorisé')

  await MongoDb()

  const me = await User.findById(session.user._id);
  const canId = me.profiles.find((profile: string) => profile.match(/admin|bureau|orga/))
  if (!canId || !me.admin) return res.status(403).send('Non autorisé')

  const sponsor = await Sponsor.findById(validator.escape(id))

  await sponsor.delete()

  trigger('public', { type: TriggerEvents.sponsors })

  res.send('sponsor supprimé !')
}
