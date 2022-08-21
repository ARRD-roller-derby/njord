import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Request from '../../../models/request.model'
import { requestType } from '../../../types/requestType.enum'
import validator from 'validator'
import checkRequestLeagueAccess from '../../../services/request/checkRequestLeagueAccess'

export default async function request(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  const { token } = req.body

  if (!token) return res.status(403).send('Cette demande est inconnu')

  await MongoDb()
  
  const request = await Request.findOne({ token: validator.escape(token) })

  if (!request) return res.status(404).send("Cette demande n'existe plus")

  // LEAGUE REQUEST
  if (request.type === requestType.league_join) {
    const canSeeRequest = await checkRequestLeagueAccess(request,session);
    if(!canSeeRequest)
      return res.status(403).send("Vous n'avez pas l'autorisation pour cette action")
  }

  //USER REQUEST
  if (request.type === requestType.for_user && session.user._id !== request.userId) 
    return res.status(403).send("Vous n'avez pas l'autorisation pour cette action")

  return res.send(request)
}
