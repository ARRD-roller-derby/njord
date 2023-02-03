import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import Poll from '../../../models/poll.model'
import { IPollOption, IPollVote } from '../../../types/poll.interface'
import { UserInterface } from '../../../types/User.interface'
import { v4 as uuidv4 } from 'uuid'

export default async function pollVote(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session?.user?.admin) return res.status(403).send('non autorisé')

  await MongoDb()
  const poll = await Poll.findById(req.body.pollId)

  if (!poll) return res.status(404).send('Sondage non trouvé')

  const voters = await User.find({
    _id: {
      $in: poll.votes.map((vote: IPollVote) => vote.userId)
    }
  })

  return res.json(
    {
      voters: poll.votes.map((vote: IPollVote) => {

        const voter = voters.find((voter: UserInterface) => voter?._id.toString() === vote.userId)
        return {
          id: uuidv4(),
          vote: poll.options.find((option: IPollOption) => option.id === vote.optionId).text,
          voter
        }
      })
    }
  )
}
