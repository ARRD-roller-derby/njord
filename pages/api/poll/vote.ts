import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import dayjs from 'dayjs'
import trigger from '../../../services/bifrost/trigger'
import { TriggerEvents } from '../../../types/trigger-events.enum'
import Poll from '../../../models/poll.model'
import { IPollVote } from '../../../types/poll.interface'

export default async function pollVote(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()
  const poll = await Poll.findById(req.body.pollId)

  if (!poll) return res.status(404).send('Sondage non trouvé')

  if (dayjs().diff(dayjs(poll.expireAt), 'hour') > 0) return res.status(403).send('Sondage expiré')

  if (req.body?.responses.length === 0) return res.status(403).send('Vous devez répondre à au moins une question')

  const isAlreadyVoted = poll.votes.find((vote: IPollVote) => vote.userId === session.user._id)

  if (isAlreadyVoted) return res.status(403).send('Vous avez déjà voté')

  req.body.responses.forEach((optionId: string) => {
    poll.votes.push({ optionId, userId: session.user._id })
  })
  await poll.save()

  const me = await User.findById(session.user._id)
  me.wallet += 50
  await me.save()

  trigger('public', { type: TriggerEvents.polls })
  trigger(session.user._id, { type: TriggerEvents.wallet })

  return res.send('Merci pour votre vote')
}
