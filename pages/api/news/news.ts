import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import { ArticleVisibility } from '../../../types/article.interface';
import Article from '../../../models/article.model';

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  
  await MongoDb()
  const OR = [
    {visibility:ArticleVisibility.public},
    {leagueId: session.user?.league?.id,visibility:ArticleVisibility.league}
  ]

  res.json({
    articles: await Article.find({$or:OR}).limit(30).sort({ updatedAt: -1 }),
    page: 1,
    totalPage: 10
  })
}