import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import S3 from '../../../utils/bucket'
import { v4 as uuidv4 } from 'uuid'
import { availableFeatures } from '../../../datasources/availableFeatures'
import { AvailableFeatureInterface } from '../../../types/feature.interface'
import Item from '../../../models/item.model'
import validator from 'validator';
import { ItemOwnerType } from '../../../types/items.interface'
import trigger from '../../../services/bifrost/trigger'

export default async function buyThumb(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')
  if (!req.body.img || typeof req?.body.img !== 'string')
    return res.status(400).send("Il manque l'image encodée")
  if (!req.body.item) return res.status(400).send("Il manque l'objet")

  const s3 = new S3()

  await MongoDb()
  const 
    me = await User.findById(session.user._id),
    item = await Item.findById(validator.escape(req.body.item._id))

  if (
    item.ownerType === ItemOwnerType.user &&
    item.ownerId !== session.user._id
  )
    return res.status(403).send('non autorisé')

  if (item.ownerType === ItemOwnerType.league  && session.user.profiles.length === 0)
    res.status(403).send('non autorisé')

  const link = await s3.sendImage('item', req.body.img, uuidv4(), 'item')

  if (!link) return res.status(400).send("L'image n'a pu être sauvegardé")
  const thumbFeat: AvailableFeatureInterface = availableFeatures.find(
    (feat) => feat.name === 'item_change_picture'
  )

  const newWallet = me.wallet - thumbFeat.cost

  if (me.wallet < 0)
    return res
      .status(400)
      .send(
        "Vous n'avais pas assez de Dragons (Dr.) pour modifier l'image de cette objet."
      )
      
  item.picture_url = link
  await item.save()   
  me.wallet = newWallet
  await me.save()

  trigger(me._id, {type: 'wallet' })
  trigger(me._id, {type: 'item' })

  res.json(item)
}
