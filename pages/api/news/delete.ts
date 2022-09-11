import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator';
import Article from '../../../models/article.model';

export default async function deleteNews(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  if (!session?.user?.league?.id) return res.status(403).send('non autorisé')
  if(!req.body.articleId)return res.status(400).send('Aucun id')

  await MongoDb()
  const article = await Article.findById(validator.escape(req.body.articleId))
  const iHaveGoodProfile = session.user.profiles.includes(article.profile)|| session.user.profiles.match(/bureau/)

  if(!iHaveGoodProfile) return res.status(403).send('non autorisé')
  await article.delete()
  
  res.send('News supprimée !')
}