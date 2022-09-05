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
  })

  if(session.user.profiles.length > 0) return res.send('no required')
  if(!feature)return res.send(false)
  if(!feature?.exp) return res.send(feature)

  const isExpired = dayjs().diff(feature.exp.delay, feature.exp.scale)

  console.log(dayjs().diff(feature.exp.delay, feature.exp.scale))
  res.send(isExpired ? false:feature)
}