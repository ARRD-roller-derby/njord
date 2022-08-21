import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../../db/mongo.connect'
import League from '../../../../models/league.model'
import { pusher } from '../../../../services/pusher/pusher'
import { LeagueInterface } from '../../../../types/League.interface'
import validator from 'validator'
import dto from '../../../../utils/dto'
import User from '../../../../models/user.model'
import jwt from 'jsonwebtoken'
import Notification from '../../../../models/notification.model'
import { bifrost } from '../../../../datasources/bifrost'
import Request from '../../../../models/request.model'
import { requestType } from '../../../../types/requestType.enum'
import userNameRender from '../../../../utils/userNameRender'

export default async function sendRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')

  const bodyLeague = dto<LeagueInterface>(
    {
      id_association: 'string',
      name: 'string',
      city: 'string',
      zipCode: 'string',
      shortName: 'string',
      webSite: 'string',
    },
    { ...req.body }
  )

  if (!bodyLeague) return res.status(403).send('Il y a un problème avec les informations envoyées')

  await MongoDb()

  //search or create
  const name =userNameRender(session.user),
    league =
      (await League.findOne({
        id_association: validator.escape(bodyLeague.id_association),
      })) || (await League.create(req.body))

  //If admin,no request
  if (session.user.admin) {
    const me = await User.findById(session.user._id)
    me.league = {
      shortName: league.shortName,
      id: league._id,
    }
    await me.save()
    return res.send('league ajoutée !')
  }

  const filterRequest = {
      userId: session.user._id,
      type: requestType.league_join,
    },
    existRequest = await Request.count(filterRequest)
  //delete old requests, you can make only one league request.
  if (existRequest > 0) {
    await Request.deleteMany(filterRequest)
  }

  const resume = `${name} veut rejoindre la league ${league.shortName}`,
    request = await Request.create({
      userId: session.user._id,
      value: {
        shortName: league.shortName,
        leagueId: league._id,
        name,
      },
      type: requestType.league_join,
      resume,
      updatedAt: new Date(),
      token: jwt.sign(
        {
          type: requestType.league_join,
        },
        `${process.env.JWT_SECRET}-${league._id}`
      ),
      answer: 'pending',
    })

  const bureau = await User.find(
      { _id: { $in: league.admins } },
      '_id email'
    ),
    notifReceivers = [...bureau]

  //admins is receivers if no bureau in league. For create bureau.
  if (notifReceivers.length === 0) {
    const admins = await User.find(
      {
        admin: {
          $eq: true,
          $exists: true,
        },
      },
      '_id email'
    )
    notifReceivers.push(...admins)
  }

  //no waiting email
  bifrost.post('request', {
    acceptUrl: req.headers.origin + '/request/accept/' + request.token,
    refusedUrl: req.headers.origin + '/request/refused/' + request.token,
    url: req.headers.origin + '/request/view/' + request.token,
    subject: resume,
    text: resume,
    host: 'Njörd',
    emails: notifReceivers.map((receiver) => receiver.email),
    name,
    league: league.shortName,
  })

  await Notification.create({
    userId: session.user._id,
    type: 'request',
    text: `Votre demande pour rejoindre la league ${league.shortName} a été envoyé.`,
    state: 'unread',
    url: '/league',
    updatedAt: new Date(),
  })

  pusher.trigger(session.user._id + '-notification', 'message', {
    type: requestType.league_join,
  })

  notifReceivers.forEach((receiver) => {
    pusher.trigger(receiver._id + '-notification', 'message', {
      type: requestType.league_join,
      toast: {
        message: resume,
        url: '/request/view/' + request.token,
      },
    })
  })

  res.send('ok')
}
