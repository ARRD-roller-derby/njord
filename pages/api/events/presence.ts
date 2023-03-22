import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Event from '../../../models/event.model'
import User from '../../../models/user.model'
import dayjs from 'dayjs'
import { EventInterface } from '../../../types/Event.interface'
import { percent } from '../../../utils/percent'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

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


  const mercredis = [...trainings.filter((event) => !!dayjs.tz(event.start, "Europe/Paris").format('LLLL').match(/mercredi|wednes|thu|jeu/))]
  const vendredis = [...trainings.filter((event) => !!dayjs.tz(event.start, "Europe/Paris").format('LLLL').match(/vendre|frid|sun|sam/))]
  const dimanche = [...trainings.filter((event) => !!dayjs.tz(event.start, "Europe/Paris").format('LLLL').match(/sund|dimanche|lun|mon/))]

  const filterPre = (e: EventInterface) => !!e.attendees.find(ev => ev.userId === userId && ev.isPresent)
  const presenceMerc = [...mercredis.filter(filterPre)]
  const presenceVen = [...vendredis.filter(filterPre)]
  const presenceDim = [...dimanche.filter(filterPre)]

  const msg = `
  ${user.name} ${user.lastname} : 

  MERCREDI: 
  total: ${mercredis.length}  - presence : ${presenceMerc.length} Soit : ${percent(presenceMerc.length, mercredis.length)}%

  VENDREDI: 
  total: ${vendredis.length}  - presence : ${presenceVen.length} Soit : ${percent(presenceVen.length, vendredis.length)}%
 
  DIMANCHE: 
  total: ${dimanche.length}  - presence : ${presenceDim.length} Soit : ${percent(presenceDim.length, dimanche.length)}%

  ${trainings.map(e => dayjs.tz(e.start, "Europe/Paris").format('LLLL') + '\n')}
  `


  res.send(msg)
}
