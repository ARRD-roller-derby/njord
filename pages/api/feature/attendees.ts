import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Feature from '../../../models/feature.model';

export default async function attendees(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()
  const feature = await Feature.findOne({
    name:{$regex:/attendees/i },
    userId: session.user._id
  })

  if(session.user.profiles.length > 0 && 
    session.user.profiles.find((profile) => profile.match(/coach|bureau/))) return res.send('no required')
  if(!feature)return res.send(false)
  if(!feature?.exp) return res.send(feature)

  const isExpired = dayjs().diff(feature.exp.delay, feature.exp.scale)
  res.send(isExpired ? false:feature)
}
