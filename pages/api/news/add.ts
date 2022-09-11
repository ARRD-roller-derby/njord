import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator';
import Article from '../../../models/article.model';

export default async function newsAdd(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  if (!session?.user?.league?.id) return res.status(403).send('non autorisé')
  const {profile,content,visibility} = req.body;

  const iHaveGoodProfile = session.user.profiles.includes(profile)
  if(!iHaveGoodProfile) return res.status(403).send('non autorisé')

  await MongoDb()
  await Article.create({
    profile: validator.escape(profile),
    content: validator.escape(content),
    visibility: validator.escape(visibility),
    updatedAt:new Date(),
    leagueId:session.user.league.id
  })

  res.send('News Publiée !')
}