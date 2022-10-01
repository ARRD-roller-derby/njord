import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Request from '../../../models/request.model'
import { requestType } from '../../../types/requestType.enum'
import validator from 'validator'
import answerLeagueForUser from '../../../services/request/answerLeagueForUser'
import answerUserForLeague from '../../../services/request/answerUserForLeague'
import userNameRender from '../../../utils/userNameRender'
import answerItem from '../../../services/request/answerItem'

export default async function requestAnswer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  const { token, answer } = req.body

  if (!token || !answer)
    return res.status(403).send('Cette demande est inconnu')

  await MongoDb()
  const request = await Request.findOne({ token: validator.escape(token) }),
    name = userNameRender(session.user)

  if (!request) return res.status(404).send("Cette demande n'existe plus")

  // ITEM REQUEST
  if (request.type === requestType.item) {
    return await answerItem(res, request, session, token, answer,req.headers.origin)
  }

  // LEAGUE REQUEST
  if (request.type === requestType.league_join) {
    return await answerLeagueForUser(res, name, request, session, token, answer)
  }

  // LEAGUE INVITE USER
  if (
    request.type === requestType.for_user &&
    request.value?.subType === requestType.league_join
  ) {
    
    return await answerUserForLeague(res,request,session,token,answer)
  }
  res.send('OK')
}
