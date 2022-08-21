import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../../db/mongo.connect'
import League from '../../../../models/league.model'
import { pusher } from '../../../../services/pusher/pusher'
import validator from 'validator'
import User from '../../../../models/user.model'
import jwt from 'jsonwebtoken'
import Notification from '../../../../models/notification.model'
import { bifrost } from '../../../../datasources/bifrost'
import Request from '../../../../models/request.model'
import { requestType } from '../../../../types/requestType.enum'
import { UserInterface } from '../../../../types/User.interface'
import userNameRender from '../../../../utils/userNameRender'

export default async function sendLeagueRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req }),
    { emails } = req.body

  if (!session || !emails) return res.status(403).send('non autorisé')

  await MongoDb()

  if (!session.isAdmin) {
    const iAmInBureauLeague = await League.count({
      admins: session.user._id,
    })

    if (iAmInBureauLeague === 0) return res.status(403).send('non autorisé')
  }

  const cleanEmails = emails
    .filter((email: string) => validator.isEmail(email))
    .map((email: string) => validator.escape(email))

  const existsUsers = await User.find({
    email: {
      $in: cleanEmails,
    },
  })

  const myName = userNameRender(session.user)

  const createUsers = await User.create(
    cleanEmails
      .filter(
        (email: string) =>
          !existsUsers.find((it: UserInterface) => it.email === email)
      )
      .map((email: string) => ({ email }))
  )

  const users = [...existsUsers, ...createUsers]

  //no 2 request in same day
  const existRequest = await Request.find({
    updatedAt: { $lt: new Date() },
    userId: { $in: existsUsers.map((o) => o._id) },
  })

  const requestedUsers = users.filter(
    (user) => !existRequest.find((req) => req.userId === user._id)
  )

  const resume = `la league ${session.user.league.shortName} vous invite à la rejoindre.`

  const requests = await Request.create(
    requestedUsers.map((user) => ({
      userId: user._id,
      value: {
        name:myName,
        shortName: session.user.league.shortName,
        leagueId: session.user.league.id,
        subType: requestType.league_join,
        email: user.email,
      },
      type: requestType.for_user,
      resume,
      updatedAt: new Date(),
      token: jwt.sign(
        {
          type: requestType.for_user,
        },
        `${process.env.JWT_SECRET}-${session.user.league.id}`
      ),
      answer: 'pending',
    }))
  )

  //no waiting email
  bifrost.post('league_invite_user', {
    acceptUrl: req.headers.origin + '/request/accept/',
    refusedUrl: req.headers.origin + '/request/refused/',
    url: req.headers.origin + '/request/view/',
    requests,
  })

  const text = `${myName} a invité ${requestedUsers.length} personne${
      requestedUsers.length > 1 ? 's' : ''
    }`

  const bureau = await League.findById(session.user.league.id)

  await Notification.create(
    bureau.admins
      .filter((admin: string) => admin !== session.user._id)
      .map((id: string) => ({
        userId: id,
        type: 'request',
        text,
        state: 'unread',
        url: '/league',
        updatedAt: new Date(),
      }))
  )

  bureau.admins
    .filter((admin: string) => admin !== session.user._id)
    .forEach((id: string) => {
      pusher.trigger(id + '-notification', 'message', {
        type: requestType.for_user,
      })
    })

  requestedUsers.forEach((user) => {
    pusher.trigger(user._id + '-notification', 'message', {
      type: requestType.for_user,
    })
  })

  res.send('ok')
}
