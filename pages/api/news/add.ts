import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Article from '../../../models/article.model'
import User from '../../../models/user.model'
import Notification from '../../../models/notification.model'
import { pushNotifications } from '../../../services/pusher/pusherBeams'
import { ArticleVisibility } from '../../../types/article.interface'
import trigger from '../../../services/bifrost/trigger'

export default async function newsAdd(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  if (!session?.user?.league?.id) return res.status(403).send('non autorisé')
  const { profile, content, visibility } = req.body

  const iHaveGoodProfile = session.user.profiles.includes(profile)
  if (!iHaveGoodProfile) return res.status(403).send('non autorisé')

  const contentEscape = validator.escape(content)

  await MongoDb()
  await Article.create({
    profile: validator.escape(profile),
    content: contentEscape,
    visibility: validator.escape(visibility),
    updatedAt: new Date(),
    leagueId: session.user.league.id,
  })

  const users = await User.find({ 'league.id': session.user.league.id }),
    resumeArray = contentEscape.split(' '),
    resume = `${resumeArray.slice(0, 100).join(' ')} ${
      resumeArray.length > 100 ? '[...]' : ''
    }`

  await Notification.create(
    users.map((user) => ({
      userId: user._id,
      type: 'news',
      text: resume,
      state: 'unread',
      url: '/news',
      updatedAt: new Date(),
    }))
  )

  users.forEach((user) => {
    trigger(user._id,{type:'news'})
  })

  const publishToInterests = ['league-' + session.user.league.id]

  if(visibility === ArticleVisibility.public)
  publishToInterests.push('league-public')
  
  pushNotifications
    .publishToInterests(
      publishToInterests,
      {
        web: {
          notification: {
            title: "Nouvelle news !",
            deep_link: req.headers.origin + '/news',
            body: validator.unescape(resume),
          },
        },
      }
    )

  res.send('News Publiée !')
}
