import League from '../../models/league.model'
import User from '../../models/user.model'
import checkRequestLeagueAccess from './checkRequestLeagueAccess'
import jwt from 'jsonwebtoken'
import { NextApiResponse } from 'next'
import { answerRequest } from '../../types/answerRequest.enum'
import Notification from '../../models/notification.model'
import { requestType } from '../../types/requestType.enum'
import { pusher } from '../../services/pusher/pusher'

export default async function answerLeagueForUser(
  res: NextApiResponse,
  name: string,
  request: any,
  session: any,
  token: string,
  answer: answerRequest
) {
  const canSeeRequest = await checkRequestLeagueAccess(request, session),
    { userId, value } = request

  try {
    jwt.verify(token, `${process.env.JWT_SECRET}-${value.leagueId}`)
  } catch (_e) {
    return res.status(403).send('Token invalide')
  }

  if (!canSeeRequest)
    return res
      .status(403)
      .send("Vous n'avez pas l'autorisation pour cette action")

  await request.delete()

  if (answer === answerRequest.accept) {
    const oldLeague = await League.findOne({ admins: userId })
    if (oldLeague) {
      oldLeague.admins = oldLeague.admins.filter((admin: string) => admin !== userId)
      await oldLeague.save()
    }

    const user = await User.findById(userId)

    if (!user?.league?.id) {
      user.wallet += 500
      pusher.trigger(userId + '-notification', 'message', { type: 'wallet' })
    }

    user.league = {
      shortName: value.shortName,
      id: value.leagueId,
    }
    user.teams = []
    user.save()
  }

  const demand = () => {
    if (answer === answerRequest.refused)
      return `Votre demande pour rejoindre la league ${value.shortName} a été refusé.`

    if (answer === answerRequest.accept)
      return `Votre demande pour rejoindre la league ${value.shortName} a été accepté.`

    return `Votre demande pour rejoindre la league ${value.shortName} est en cours.`
  }

  await Notification.create({
    userId: userId,
    type: 'request',
    text: demand(),
    state: 'unread',
    url: '/league',
    updatedAt: new Date(),
  })

  pusher.trigger(userId + '-notification', 'message', {
    type: requestType.league_join,
    toast: {
      message: demand(),
      url: '/league',
    },
  })

  //reload count
  pusher.trigger(session.user._id + '-notification', 'message', {
    type: requestType.league_join,
  })

  if (Array.isArray(canSeeRequest)) {
    const admins = canSeeRequest.filter((o) => o !== session.user._id),
      resume = () => {
        if (answer === answerRequest.refused)
          return `${name} a rejeté la demande de ${value.name} d'intégrer la league ${value.shortName}`

        if (answer === answerRequest.accept)
          return `${name} a accepté la demande de ${value.name} d'intégrer la league ${value.shortName}`

        return 'Un problème est survenu avec une requête'
      }

    await Notification.create(
      admins.map((admin) => ({
        userId: admin,
        type: 'request',
        text: resume(),
        state: 'unread',
        url: '/league',
        updatedAt: new Date(),
      }))
    )

    admins.forEach((admin) => {
      pusher.trigger(admin + '-notification', 'message', {
        type: requestType.league_join,
        toast: {
          message: resume(),
          url: '/league',
        },
      })
    })
    
  }

  return res.send('Vous avez refusé la requête.')
}
