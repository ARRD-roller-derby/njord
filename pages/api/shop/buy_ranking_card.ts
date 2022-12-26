import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { contestCardPrices } from '../../../datasources/contest_card_prices'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import trigger from '../../../services/bifrost/trigger'
import { TriggerEvents } from '../../../types/trigger-events.enum'

export default async function buyRankingCard(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  const card = contestCardPrices.find(contestCard => contestCard.name === req.body.name)
  await MongoDb()

  const user = await User.findById(session.user._id)
  if (!user) return res.status(403).send('non autorisé')

  if (user.wallet - card.cost < 0) return res.status(400).send('Tu n\'as pas assez de dragons.')

  user.rank_card = card.name
  user.wallet = user.wallet - card.cost
  await user.save()
  trigger(user._id, { type: TriggerEvents.wallet })

  return res.send('Merci pour cet achat !')
}
