import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import validator from 'validator'
import Event from '../../../models/event.model'
import { DISCORD_EVENT_HOOK } from '../../../utils/constants'
import axios from 'axios'
import { getThreadEventName } from '../../../utils/getThreadEventName'

export default async function updateField(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req }),
    { userId, field, value } = req.body

  if (!userId || !field) return res.status(400).send('Champs manquant')

  if (!session) return res.status(403).send('Non autorisé')
  await MongoDb()

  const me = await User.findById(session.user._id),
    //All profile can be touch event
    canIUpdateThisField = me.profiles.length > 0

  if (!canIUpdateThisField) return res.status(403).send('Non autorisé')

  const event = await Event.findById(validator.escape(req.body.id))

  event[req.body.field] = typeof value === 'string' ? validator.escape(req.body.value) : req.body.value

  if (req.body.field === 'start' && event.type.match(/training|match|scrimmage|AG/)) {
    event.end = event.start
  }

  if (field === 'description') {

    if (event.thread_id) {
      axios.post(DISCORD_EVENT_HOOK, {
        content: `**MAJ**\n${validator.unescape(event.description)}`,

      }, {
        params: {
          thread_id: event.thread_id,
        }
      })
    } else {
      const address = event.address ? `*${event.address.address || event.address.street} - ${event.address.zipcode} ${event.address.city}*` : ''

      const res = await axios.post(DISCORD_EVENT_HOOK, {

        content: `*[voir sur Njörd](https://njord.arrd.fr/event${event._id})*\n${address}\n${validator.unescape(event.description)} 
        `,
        thread_name: getThreadEventName(event)
      }, {
        params: {
          wait: true
        }
      })

      if (res.data) {
        event.thread_id = res.data?.id || ''
      }
    }

  }




  await event.save()

  res.send('événement mis à jour')
}
