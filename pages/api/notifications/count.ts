import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import League from '../../../models/league.model'
import Notification from '../../../models/notification.model'
import Request from '../../../models/request.model'
import { requestType } from '../../../types/requestType.enum'
import OrForRequest from '../../../utils/OrForRequest'

export default async function notificationsCount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')
  await MongoDb();
  let count = 0;
  count += await Notification.count({ userId: session.user._id, state:'unread' });

  //TODO Add other request if necessary.
  const OR = await OrForRequest(session)

  count += OR.length > 0 ? await Request.count().or(OR):0 

  res.send(count)
}
