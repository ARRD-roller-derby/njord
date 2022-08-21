import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import isEmail from 'validator/lib/isEmail';
import validator from 'validator';

export default async function addUser(
  req: NextApiRequest,
  res: NextApiResponse
) {


  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()

  const me = await User.findById(session.user._id),
    isAdmin = me.isAdmin()

  if (!isAdmin) return res.status(403).send('non autorisé')

  if (!req.body.email) return res.status(400).send('Aucun email envoyé')

  const email = isEmail(req.body.email) ;

  if(!email) return res.status(400).send('Mauvais format')
  
  const filter = {email:validator.escape(req.body.email)},
    isExist = await User.count(filter)

  res.json(isExist || await User.create(filter))
}
