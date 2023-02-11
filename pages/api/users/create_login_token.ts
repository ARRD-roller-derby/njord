import { NextApiRequest, NextApiResponse } from 'next'
import { MongoDb } from '../../../db/mongo.connect'

import validator from 'validator';
import Code from '../../../models/code';
import { codeGenerator } from '../../../utils/code-generator';
import dayjs from 'dayjs';
import jsonwebtoken from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export default async function createLoginToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await MongoDb()
  if (!req.body.email) return res.status(400).send('Aucun email envoyé')

  const loginCode = codeGenerator(6)
  const expiresAt = dayjs().add(5, 'minute').toDate()
  const existCode = await Code.findOne({ email: validator.escape(req.body.email) })
  const verifyKey = uuidv4()
  const token = jsonwebtoken.sign({ verifyKey }, process.env.JWT_SECRET, { expiresIn: '15m' })
  if (existCode) {
    existCode.code = loginCode
    existCode.url = req.body.url
    existCode.numberTry = 0
    existCode.verifyKey = verifyKey
    existCode.updatedAt = new Date()
    existCode.expiresAt = expiresAt
    await existCode.save()
  } else {
    const code = new Code({
      email: validator.escape(req.body.email),
      code: loginCode,
      url: req.body.url,
      numberTry: 0,
      verifyKey: verifyKey,
      updatedAt: new Date(),
      expiresAt: expiresAt
    })
    await code.save()
  }
  return res.send({ token })
}
