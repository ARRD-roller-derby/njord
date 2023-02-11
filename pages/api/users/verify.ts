import { NextApiRequest, NextApiResponse } from 'next'
import { MongoDb } from '../../../db/mongo.connect'
import jsonwebtoken from 'jsonwebtoken';
import validator from 'validator';
import Code from '../../../models/code';
import dayjs from 'dayjs';
import { codeGenerator } from '../../../utils/code-generator';

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (!req.body.code) return res.status(400).send('Aucun code envoyé')
  await MongoDb()
  const verifyKeyJWT = jsonwebtoken.verify(req.body.token, process.env.JWT_SECRET) as { verifyKey: string }
  if (!verifyKeyJWT) return res.status(400).send('Token invalide')
  const verifyKey = verifyKeyJWT?.verifyKey

  if (!verifyKey) return res.status(400).send('Token invalide')
  const code = await Code.findOne({ verifyKey })

  if (code.code !== validator.escape(req.body.code.toUpperCase())) {
    code.numberTry += 1

    if (code.numberTry >= 3) {
      code.numberTry = 0
      code.code = codeGenerator(6)
      code.token = ''
      await code.save()
      return res.status(403).send('Votre demande de mot de passe a expiré')
    }

    await code.save()
    return res.status(400).send('Code invalide')
  }

  if (!code) return res.status(400).send('Code invalide')



  if (dayjs().isAfter(code.expiresAt)) return res.status(400).send('Code expiré')

  //recreate a invalid code for security
  code.numberTry = 0
  code.code = codeGenerator(6)
  code.expiresAt = dayjs().subtract(20, 'minute').toDate()
  await code.save()
  //--------------------------------------------
  return res.send({ url: code.url })
}
