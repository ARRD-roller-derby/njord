import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../../db/mongo.connect'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import Request from '../../../../models/request.model'
import { requestType } from '../../../../types/requestType.enum'
import userNameRender from '../../../../utils/userNameRender'
import Item from '../../../../models/item.model'
import {
  ItemLocalizationType,
  ItemOwnerType,
} from '../../../../types/items.interface'
import User from '../../../../models/user.model'
import { pushNotifications } from '../../../../services/pusher/pusherBeams'
import trigger from '../../../../services/bifrost/trigger'

export default async function sendRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')

  if (!req.body.itemId)
    return res
      .status(403)
      .send('Il y a un problème avec les informations envoyées')
  const itemId = validator.escape(req.body.itemId)

  const item = await Item.findById(itemId)

  await MongoDb()

  const name = userNameRender(session.user)

  //If "PLACE", not request require. For place to user
  if (item.localization.type === ItemLocalizationType.place) {
    item.localization = {
      type: ItemLocalizationType.user,
      name,
      id: session.user._id,
      updatedAt: new Date(),
    }

    await item.save()

    if(item.ownerType === ItemOwnerType.league){
      const users = await User.find({'league.id':session.user?.league?.id})
  
      users.forEach(user=>{
        trigger(user._id,{
          type: requestType.item,
          id: item._id,
        })
      })
      
    } else {
      trigger(item.localization.id ,{
        type: requestType.item,
        id: item._id,
      })
    
    }

    return res.send("Vous avez récupéré l'objet")
  }

  const isExist = await Request.findOne({
    userId: session.user._id,
    type: requestType.item,
    'value.itemId': validator.escape(req.body.itemId),
  })

  if (isExist) return res.status(403).send('Une requête existe déjà')

  const resume = `${name} veut recupérer l'objet ${item.name}`

  await Request.create({
    userId: session.user._id,
    value: {
      shortName: item.name,
      userId: item.localization.id,
      itemId: validator.escape(req.body.itemId),
      name,
    },
    type: requestType.item,
    resume,
    updatedAt: new Date(),
    token: jwt.sign(
      {
        type: requestType.league_join,
      },
      `${process.env.JWT_SECRET}-${itemId}`
    ),
    answer: 'pending',
  })

  trigger(item.localization.id ,{
    type: requestType.item,
    id: item._id,
  })

  pushNotifications.publishToInterests(['user-' + item.localization.id], {
    web: {
      notification: {
        title: 'Requête d\'objet',
        deep_link: req.headers.origin + '/notifications',
        body: resume,
      },
    },
  })

  res.send('Demande de récupération envoyé')
}
