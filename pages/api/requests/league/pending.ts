import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../../db/mongo.connect'
import Request from '../../../../models/request.model';
import { RequestInterface } from '../../../../types/Request.interface';
import { requestType } from '../../../../types/requestType.enum';
import dayjs from 'dayjs';

export default async function pendingRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')
  await MongoDb()
  const request:RequestInterface = await Request.findOne({ userId: session.user._id,type: requestType.league_join })

  // Pour bloquer le bouton rejoindre, une requête max par jour.
  if (request) {
    res.json({
      message:  `Votre demande pour rejoindre la league ${request.value.shortName} est en cours d'examen.`,
      canIRequest: dayjs().diff(request.updatedAt, 'day') > 1
    })
  } else {
    res.json({
      message: '',
      canIRequest:true
    })
  }
}
