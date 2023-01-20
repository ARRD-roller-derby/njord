import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import { v4 as uuidv4 } from 'uuid'
import validator from 'validator'
import User from '../../../models/user.model'
import Event from '../../../models/event.model'
import trigger from '../../../services/bifrost/trigger'

export default async function event(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')
  if (!session.user?.profiles.find((profile: string) =>
    profile.match(/bureau|coach|com|fest|orga|merch/)
  )) return res.status(403).send('non autorisé')
  await MongoDb()

  const
    startDay = dayjs(validator.escape(req.body.start)),
    endDay = dayjs(validator.escape(req.body.end || req.body.start)),
    recurrenceId = uuidv4()

  //TODO requierement à traiter plus tard
  const event = {
    start: validator.escape(req.body.start),
    end: req.body.type.match(/training|match|scrimmage|AG/) ? validator.escape(req.body.start) : validator.escape(req.body.end || req.body.start),
    title: req.body.title ? validator.escape(req.body.title) : undefined,
    leagueId: session.user.league.id,
    hourStart: validator.escape(req.body.hourStart),
    hourEnd: validator.escape(req.body.hourEnd),
    description: req.body.description ? validator.escape(req.body.description) : '',
    recurrenceId,
    visibility: validator.escape(req.body.visibility),
    cancel: false,
    type: validator.escape(req.body.type),
    guests: [],
    leaguesGuest: [],
    items: req.body?.items ? req.body?.items.map((item: string) => validator.escape(item)) : [],
    requirements: [],
    attendees: [],
    events: [],
    address: typeof req.body.address === 'object' ? req.body.address : undefined,
  }

  const creatableEvents = [event];

  if (req.body.recurrence && parseInt(req.body.recurrence.num) > 0) {
    for (let i = 1; i < parseInt(req.body.recurrence.num); i++) {
      creatableEvents.push({
        ...event,
        start: startDay.add(i, req.body.recurrence.type).toString(),
        end: endDay.add(i, req.body.recurrence.type).toString(),
      })
    }
  }

  await Event.create(creatableEvents)

  //Juste league's user. see to update other (guests, not public)
  const users = await User.find({
    'league.id': session.user.league.id
  })

  users.forEach(user => {
    trigger(user._id, { type: 'event' })
  })

  const msg = creatableEvents.length > 1 ? `${creatableEvents.length} événement créés.` : 'événement créé.'
  res.send(msg)
}
