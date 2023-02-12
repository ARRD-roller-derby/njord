import { NextApiRequest, NextApiResponse } from 'next'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator';
import Code from '../../../models/code';
import { codeGenerator } from '../../../utils/code-generator';
import dayjs from 'dayjs';


export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await MongoDb()
  if (!req.body.email) return res.status(400).send('Aucun email envoyé')

  const loginCode = codeGenerator(6)
  const expiresAt = dayjs().add(5, 'minute').toDate()

  const existCode = await Code.findOne({ email: validator.escape(req.body.email) })
  if (!existCode) {
    const code = new Code({
      email: validator.escape(req.body.email),
      code: loginCode,
      url: req.body.url,
      expiresAt,
    })
    await code.save()
  } else {
    existCode.code = loginCode
    existCode.url = req.body.url
    existCode.updatedAt = new Date()
    existCode.expiresAt = expiresAt
    await existCode.save()
  }


  return res.send({ loginCode })
}
