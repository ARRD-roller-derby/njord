import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import { pusher } from '../../../services/pusher/pusher'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import Request from '../../../models/request.model'
import { requestType } from '../../../types/requestType.enum'
import userNameRender from '../../../utils/userNameRender'
import Item from '../../../models/item.model'
import {
  ItemLocalizationType,
  ItemOwnerType,
} from '../../../types/items.interface'
import User from '../../../models/user.model'

export default async function deposit(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')

  if (!req.body.itemId || !req.body.address)
    return res
      .status(403)
      .send('Il y a un problème avec les informations envoyées')

  const 
    itemId = validator.escape(req.body.itemId),
    address = validator.escape(req.body.address)

  const item = await Item.findById(itemId)

  if (
    item.ownerType === ItemOwnerType.user &&
    item.ownerId !== session.user._id
  )
    return res.status(403).send('non autorisé')

  if (
    item.ownerType === ItemOwnerType.league &&
    item.ownerId !== session.user?.league?.id
  )
    return res.status(403).send('non autorisé')

  await MongoDb()

  const name = userNameRender(session.user)

    item.localization = {
      type: ItemLocalizationType.place,
      name:address,
      id: session.user._id,
      updatedAt: new Date(),
    }

    await item.save()

  return res.send("Vous avez déposé l'objet")



  if(item.ownerType === ItemOwnerType.league){
    const users = await User.find({'league.id':session.user?.league?.id})

    users.forEach(user=>{
      pusher.trigger(user._id + '-notification', 'message', {
        type: requestType.item,
        id: item._id,
      })
    })
    
  } else {
    pusher.trigger(item.localization.id + '-notification', 'message', {
      type: requestType.item,
      id: item._id,
    })
  
  }

  res.send('Demande de récupération envoyé')
}
