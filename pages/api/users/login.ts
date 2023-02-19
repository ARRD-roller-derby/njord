import { NextApiRequest, NextApiResponse } from 'next'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator';
import Code from '../../../models/code';
import dayjs from 'dayjs';


export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await MongoDb()
  if (!req.body.email) return res.status(400).send('Aucun email envoyé')

  const expiresAt = dayjs().add(5, 'minute').toDate()
  const existCode = await Code.findOne({ email: validator.escape(req.body.email) })
  existCode.url = req.body.url
  existCode.updatedAt = new Date()
  existCode.expiresAt = expiresAt
  await existCode.save()

  return res.send({ loginCode: existCode.code })
}
