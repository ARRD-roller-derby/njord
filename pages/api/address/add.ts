import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Address from '../../../models/adresses.model';
import { addressType } from '../../../types/addressType.enum';
import validator from 'validator';

export default async function addressAdd(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  const {label,address,type} = req.body;

  if(!label || !address?.address || !type)return res.status(403).send('Il manque des informations')

  await MongoDb()
  //personnal is unique
  if(type === addressType.personnal) await Address.deleteMany({type:addressType.personnal});

  const newAddress = await Address.create({
    ownerId: session.user._id,
    lat: parseFloat(address?.lat || 0), 
    lon: parseFloat(address?.lon || 0), 
    city: validator.escape(address?.city || ''),
    zipcode: validator.escape(address?.zipcode.toString() || ''),
    street: validator.escape(address?.address || ''),
    label: validator.escape(label),
    type: validator.escape(type)
  })

  res.json(newAddress)
}