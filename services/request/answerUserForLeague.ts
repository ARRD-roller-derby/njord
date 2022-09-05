import { answerRequest } from "../../types/answerRequest.enum"
import { NextApiResponse } from 'next';
import { requestType } from "../../types/requestType.enum";
import jwt from 'jsonwebtoken';
import League from "../../models/league.model";
import User from "../../models/user.model";
import Notification from "../../models/notification.model";
import { pusher } from '../../services/pusher/pusher'

export default async function answerUserForLeague(  res: NextApiResponse,
  request: any,
  session: any,
  token: string,
  answer: answerRequest){
  const { userId, value } = request

    //check auth
    if (request.type === requestType.for_user && session.user._id !== userId)
      return res
        .status(403)
        .send("Vous n'avez pas l'autorisation pour cette action")

    try {
      jwt.verify(token, `${process.env.JWT_SECRET}-${value.leagueId}`)
    } catch (_e) {
      return res.status(403).send('Token invalide')
    }

    await request.delete()

    const { admins } = await League.findById(value.leagueId, 'admins')

    const notifText = `${value.name} a  ${
      answer === answerRequest.accept ? 'accepté' : 'refusé'
    } votre invitation à rejoindre la league`
    console.log('L', admins)


    if (answer === answerRequest.accept) {
      const oldLeague = await League.findOne({ admins: userId })
      if (oldLeague) {
        oldLeague.admins = oldLeague.admins.filter((admin: string) => admin !== userId)
        await oldLeague.save()
      }

      await User.findOneAndUpdate(
        { _id: userId },
        {
          league: {
            shortName: value.shortName,
            id: value.leagueId,
          },
          teams: [],
        }
      )
    }

    await Notification.create(
      admins.map((admin: string) => ({
        userId: admin,
        type: 'request',
        text: notifText,
        state: 'unread',
        url: '/league',
        updatedAt: new Date(),
      }))
    )

    admins.forEach((admin:string) => {
      pusher.trigger(admin + '-notification', 'message', {
        type: requestType.league_join,
        toast: {
          message: notifText,
          url: '/league',
        },
      })
    })

    //reload count
    pusher.trigger(session.user._id + '-notification', 'message', {
      type: requestType.league_join,
    })

    return res.send('Réponse envoyé')
}