import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Event from '../../../models/event.model'
import eventWithPresence from '../../../utils/eventWithPresence'
import User from '../../../models/user.model'
import dayjs from 'dayjs'
import { EventInterface } from '../../../types/Event.interface'
import { percent } from '../../../utils/percent'

export default async function event(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  if (!session.user.admin) return res.status(403).send('non autorisé')
  await MongoDb()
  const { email } = req.query

  const user = await User.findOne({ email })
  const userId = user._id.toString()

  const trainings = await Event.find({
    type: 'training',
  }).select('_id cancel attendees start')


  const mercredis = trainings.filter((event) => dayjs(event.start).format('d') == '3')
  const vendredis = trainings.filter((event) => dayjs(event.start).format('d') == '4')
  const dimanche = trainings.filter((event) => dayjs(event.start).format('d') == '0')

  const filterPre = (e: EventInterface) => !!e.attendees.find(ev => ev.userId === userId && ev.isPresent)
  const presenceMerc = mercredis.filter(filterPre)
  const presenceVen = vendredis.filter(filterPre)
  const presenceDim = dimanche.filter(filterPre)

  console.log(presenceVen, presenceDim)


  const msg = `
  ${user.name} ${user.lastname} : 

  MERCREDI: 
  total: ${mercredis.length}  - presence : ${presenceMerc.length} Soit : ${percent(presenceMerc.length, mercredis.length)}%

  VENDREDI: 
  total: ${vendredis.length}  - presence : ${presenceVen.length} Soit : ${percent(presenceVen.length, vendredis.length)}%
 
  DIMANCHE: 
  total: ${dimanche.length}  - presence : ${presenceDim.length} Soit : ${percent(presenceDim.length, dimanche.length)}%
  `
  res.send(msg)
}
