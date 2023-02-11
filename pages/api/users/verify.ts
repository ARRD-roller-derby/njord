import { NextApiRequest, NextApiResponse } from 'next'
import { MongoDb } from '../../../db/mongo.connect'

import validator from 'validator';
import Code from '../../../models/code';
import dayjs from 'dayjs';

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (!req.body.code) return res.status(400).send('Aucun code envoyé')
  await MongoDb()
  const code = await Code.findOne({ code: validator.escape(req.body.code.toUpperCase()) })

  if (!code) return res.status(400).send('Code invalide')

  if (dayjs().isAfter(code.expiresAt)) return res.status(400).send('Code expiré')
  return res.send({ url: code.url })
}
