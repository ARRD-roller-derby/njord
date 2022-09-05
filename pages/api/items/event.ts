import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import validator from 'validator'
import Event from '../../../models/event.model'
import Item from '../../../models/item.model'
import { ItemInterface, ItemLocalizationType } from '../../../types/items.interface'

export default async function event(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()

  const 
    OR = [],
    id= validator.escape(req.body.id)

  OR.push({_id:id,guests:session.user._id})

  if (session.user?.league.id) {
    OR.push(
      {_id:id,leaguesGuest: session.user?.league.id},
      {_id:id,leagueId: session.user?.league.id}
    )
  }
  const {address,attendees,items:eventItems} = await Event.findOne({$or:OR}).populate('attendees')
  const items = await Item.find({_id:{$in:eventItems}})

  function isHere(item:ItemInterface){
    console.log(address)
    if(item.localization.type === ItemLocalizationType.user ){
      return !!attendees.find((id:string)=>id === item.localization.id)
    }
    if(item.localization.type === ItemLocalizationType.place ){
      const addr= `${address.street || address.address || ''}, ${address.zipcode} ${address.city}`
      return addr === item.localization.name
    }

    return false
  }
  
  res.json(items.map(item=>({
   _id:item.id,
    name:item.name,
    localization:item.localization,
    picture_url: item.picture_url,
    ownerId: item.ownerId,
    ownerType: item.ownerType,
    isHere: isHere(item)
  })))
}
