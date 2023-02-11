import { NextApiRequest, NextApiResponse } from 'next'
import { MongoDb } from '../../../db/mongo.connect'
import jsonwebtoken from 'jsonwebtoken';
import validator from 'validator';
import Code from '../../../models/code';
import dayjs from 'dayjs';

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (!req.body.code) return res.status(400).send('Aucun code envoyé')
  await MongoDb()
  console.log(req.body)
  const verifyKeyJWT = jsonwebtoken.verify(req.body.token, process.env.JWT_SECRET) as { verifyKey: string }
  if (!verifyKeyJWT) return res.status(400).send('Token invalide')
  const verifyKey = verifyKeyJWT?.verifyKey

  if (!verifyKey) return res.status(400).send('Token invalide')
  const code = await Code.findOne({ code: validator.escape(req.body.code.toUpperCase()), verifyKey })

  if (!code) return res.status(400).send('Code invalide')

  console.log(code)
  if (dayjs().isAfter(code.expiresAt)) return res.status(400).send('Code expiré')
  return res.send({ url: code.url })
}
