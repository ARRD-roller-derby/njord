import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import League from '../../../models/league.model'

export default async function leagues(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  await MongoDb()
  res.json(await League.find({},'_id shortName name teams city zipCode'))
}
