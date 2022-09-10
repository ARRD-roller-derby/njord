import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import S3 from '../../../utils/bucket'
import { v4 as uuidv4 } from 'uuid'
import { createCanvas, Image } from 'canvas'
import { availableFeatures } from '../../../datasources/availableFeatures'
import { pusher } from '../../../services/pusher/pusher'
import { AvailableFeatureInterface } from '../../../types/feature.interface';

export default async function buyAvatar(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')
  if (!req.body.img || typeof req?.body.img !== 'string')
    return res.status(400).send("Il manque l'image encodée")

  const s3 = new S3(),
    size = 80,
    canvas = createCanvas(size, size),
    context = canvas.getContext('2d'),
    img = new Image()

  img.onload = () => context.drawImage(img, 0, 0, size, size)
  img.onerror = () => res.status(400).send("Un problème avec l'image")
  img.src = req.body.img

  await MongoDb()
  const me = await User.findById(session.user._id)
  console.log('-----',me)
  const link = await s3.sendImage(
    'avatar',
    canvas.createPNGStream(),
    uuidv4(),
    'avatar'
  )

  if (!link) return res.status(400).send("L'image n'a pu être sauvegardé")
  const avatarFeat:AvailableFeatureInterface = availableFeatures.find(
    (feat) => feat.name === 'avatar_change'
  )

  const newWallet = me.wallet - avatarFeat.cost

  if(me.wallet <0) return res.status(400).send("Vous n'avais pas assez de Dragons (Dr.) pour modifier votre avatar.")
  
  me.avatar = link
  me.wallet = newWallet
  await me.save()

  pusher.trigger(me._id + '-notification', 'message', { type: 'wallet' })
  pusher.trigger(me._id + '-notification', 'message', { type: 'avatar' })

  res.json('Merci pour votre achat !')
}
