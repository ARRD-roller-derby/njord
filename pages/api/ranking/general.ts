import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import User from "../../../models/user.model";
import { MongoDb } from '../../../db/mongo.connect'
import dayjs from 'dayjs'

export default async function generalRanking(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  const { page } = req.body

  await MongoDb()
  const types = [
    {
      type: 'dailyContestAvgAccuracy',
      name: 'percent',
    },
    {
      type: 'dailyContestAvgTime',
      name: 'speed',
    }
  ]

  const { type } = types.find(type => type.name === req.body.type) || types[0]
  const perPage = 50
  const where = {
    [type]: { $exists: true },
    lastDailyContest: { $gte: dayjs().subtract(10, 'day').toISOString() }
  }

  const direction = type === 'dailyContestAvgAccuracy' ? -1 : 1
  const totalRanking = await User.count(where)
  const ranking = await User.find(where).skip(page > 1 ? page * perPage - perPage : 0).select('avatar lastname name derbyName numRoster email dailyContestAvgAccuracy dailyContestAvgTime lastDailyContest').limit(perPage).sort({
    [type]: direction,
    derbyName: 1,
  })

  res.json({
    ranking,
    faster: ranking[ranking.length - 1]?.dailyContestAvgTime,
    slower: ranking[0]?.dailyContestAvgTime,
    totalPage: Math.ceil(totalRanking / perPage)
  })

}

