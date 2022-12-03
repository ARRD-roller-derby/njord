import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import { ArticleVisibility } from '../../../types/article.interface';
import Article from '../../../models/article.model';

export default async function news(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  
  const {page} = req.body

  await MongoDb()
  const OR = [
    {visibility:ArticleVisibility.public},
    {leagueId: session.user?.league?.id,visibility:ArticleVisibility.league}
  ]

  const perPage = 10

  const totalArticle = await Article.count({$or:OR})

  console.log(page)
  res.json({
    articles: await Article.find({$or:OR }).skip(page > 1 ? page * perPage - perPage: 0).limit(perPage).sort({ updatedAt: -1 }),
    totalPage: Math.ceil(totalArticle / perPage)
  })
}