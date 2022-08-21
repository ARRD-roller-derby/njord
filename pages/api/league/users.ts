import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'

export default async function usersLeague(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()

  if(!session.user?.league?.id)res.json([await User.findById(session.user._id)])

  const users = await User.find({
    'league.id' : session.user.league.id
  })

  const isAmBureau = !!session.user.profiles.find((profile:string)=> profile === 'bureau');

  res.json(users.map(user=>{
    if(isAmBureau || user._id === session.user._id) return user
    const newUser = {...user.toObject()};
    if(!newUser.emailVisibility) delete newUser.email
    if(!newUser.phoneVisibility) delete newUser.phone
    return newUser 
  }))
}