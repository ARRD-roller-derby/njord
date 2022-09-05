import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../../db/mongo.connect'
import Request from '../../../../models/request.model';
import { RequestInterface } from '../../../../types/Request.interface';
import { requestType } from '../../../../types/requestType.enum';
import validator from 'validator';

export default async function pendingRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')
  if (!req.body.itemId) return res.status(400).send("impossible d'identifier l'objet")
  await MongoDb()
  const request:RequestInterface = await Request.findOne({ userId: session.user._id,type: requestType.item, 'value.itemId': validator.escape(req.body.itemId) })

  res.json({inProgress: !!request})
}
