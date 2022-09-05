import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import { v4 as uuidv4 } from 'uuid'
import validator from 'validator'
import { pusher } from '../../../services/pusher/pusher'
import { EventType } from '../../../types/EventType.enum'
import User from '../../../models/user.model'
import Event from '../../../models/event.model'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import fr from 'dayjs/locale/fr'
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.locale(fr)
dayjs.tz.guess()
dayjs.tz.setDefault("Europe/Paris")

export default async function event(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')
  if(!session.user?.profiles.find((profile: string) =>
  profile.match(/bureau|coach|com|fest/)
))return res.status(403).send('non autorisé')
  await MongoDb()

  //TODO FEAT 
  //---> ajouter les guests. (email d'user et league)
  if (!req.body.address && req.body.type !== EventType.online) return res.status(400).send('Il manque une adresse')

  const 
    endDate = dayjs(req.body.endDate),
    startDate = dayjs(req.body.startDate),
    startDay = endDate.diff(startDate,'day') < 0 ? endDate:startDate,
    endDay = endDate.diff(startDate,'day') < 0 ? startDate:endDate,
    recurrenceId = uuidv4()

  //TODO requierement à traiter plus tard
  const event = {
    start: startDay.format('YYYY-MM-DD')+'T00:00:00.000+00:00',
    end: endDay.format('YYYY-MM-DD')+'T00:00:00.000+00:00',
    title: req.body.title  ? validator.escape(req.body.title):undefined,
    leagueId:session.user.league.id,
    hourStart:validator.escape(req.body.hourStart),
    hourEnd:validator.escape(req.body.hourEnd),
    description: req.body.description  ? validator.escape(req.body.description):'',
    recurrenceId,
    visibility:validator.escape(req.body.visibility),
    cancel:false,
    type:validator.escape(req.body.type),
    guests: [],
    leaguesGuest: [],
    items:req.body?.items ? req.body?.items.map((item:string)=>validator.escape(item)):[],
    requirements:[],
    attendees:[],
    events:[],
    address: typeof req.body.address === 'object'?req.body.address:undefined,
  }

  const creatableEvents = [event];

  if(req.body.recurrence &&  parseInt(req.body.recurrence.num) > 0){
    for(let i=1;i< parseInt(req.body.recurrence.num);i++){
      creatableEvents.push({
        ...event,
        start: startDay.add(i,req.body.recurrence.type).toString(),
        end: endDay.add(i,req.body.recurrence.type).toString(),
      })
    }
  }

  await Event.create(creatableEvents)

  //Juste league's user. see to update other (guests, not public)
  const users = await User.find({
    'league.id':session.user.league.id
  })

  users.forEach(user=>{
    pusher.trigger(user._id + '-notification', 'message', {
      type: 'event',
    })
  })

  const msg = creatableEvents.length > 1 ? `${creatableEvents.length} événement créés.`:'événement créé.'
  res.send(msg)
}
