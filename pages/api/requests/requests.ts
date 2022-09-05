import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Request from '../../../models/request.model'
import OrForRequest from '../../../utils/OrForRequest'

export default async function requests(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  
  await MongoDb()

  const OR = await OrForRequest(session);

  res.send(OR.length > 0 ? await Request.find().or(OR):[])
}
