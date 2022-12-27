import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import User from '../../../models/user.model'
import S3 from '../../../utils/bucket'
import { v4 as uuidv4 } from 'uuid'
import { availableFeatures } from '../../../datasources/availableFeatures'
import { AvailableFeatureInterface } from '../../../types/feature.interface';
import trigger from '../../../services/bifrost/trigger'
import { TriggerEvents } from '../../../types/trigger-events.enum'

export default async function buyAvatar(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(403).send('non autorisé')
  if (!req.body.img || typeof req?.body.img !== 'string')
    return res.status(400).send("Il manque l'image encodée")

  const s3 = new S3();

  await MongoDb()
  const me = await User.findById(session.user._id)

  const link = await s3.sendImage(
    'avatar',
    req.body.img,
    uuidv4(),
    'avatar'
  )

  if (!link) return res.status(400).send("L'image n'a pu être sauvegardé")
  const avatarFeat: AvailableFeatureInterface = availableFeatures.find(
    (feat) => feat.name === 'avatar_change'
  )

  const newWallet = me.wallet - avatarFeat.cost

  if (me.wallet < 0) return res.status(400).send("Vous n'avais pas assez de Dragons (Dr.) pour modifier votre avatar.")

  me.avatar = link
  me.wallet = newWallet
  await me.save()

  trigger(me._id, { type: TriggerEvents.wallet })
  trigger(me._id, { type: 'avatar' })

  res.send('Merci pour votre achat !')
}
