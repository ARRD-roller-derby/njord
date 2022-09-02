import jwt from 'jsonwebtoken'
import { NextApiResponse } from 'next'
import { answerRequest } from '../../types/answerRequest.enum'
import Notification from '../../models/notification.model'
import { requestType } from '../../types/requestType.enum'
import { pusher } from '../pusher/pusher'
import Item from '../../models/item.model'
import {
  ItemLocalizationType,
  ItemOwnerType,
} from '../../types/items.interface'
import validator from 'validator'
import User from '../../models/user.model'

export default async function answerItem(
  res: NextApiResponse,
  request: any,
  session: any,
  token: string,
  answer: answerRequest
) {
  const item = await Item.findById(request.value.itemId)
  if (!item) return res.status(404).send('Objet non trouvé')

  const newCarrierId = validator.escape(request.userId)
  try {
    jwt.verify(token, `${process.env.JWT_SECRET}-${item._id}`)
  } catch (_e) {
    return res.status(403).send('Token invalide')
  }

  if (answer === answerRequest.accept) {
    item.localization = {
      type: ItemLocalizationType.user,
      name: validator.escape(request.value.name),
      id: newCarrierId,
      updatedAt: new Date(),
    }

    await item.save()
  }

  const demand = () => {
    if (answer === answerRequest.refused)
      return `Votre demande pour recupérer l'objet ${request.value.shortName} a été rejetée.`

    if (answer === answerRequest.accept)
      return `Vous avez recupéré l'objet ${request.value.shortName}.`

    return `Votre demande pour recupérer l'objet ${request.value.shortName} est en cours.`
  }

  await Notification.create({
    userId: newCarrierId,
    type: 'request',
    text: demand(),
    state: 'unread',
    url: '/stuff',
    updatedAt: new Date(),
  })

  pusher.trigger(newCarrierId + '-notification', 'message', {
    type: requestType.item,
    toast: {
      message: demand(),
      url: '/stuff',
    },
  })

  //reload count

  if (item.ownerType === ItemOwnerType.league) {
    const users = await User.find({ 'league.id': session.user?.league?.id })

    users.forEach((user) => {
      pusher.trigger(user._id + '-notification', 'message', {
        type: requestType.item,
        id: item._id,
      })
    })
  } else {
    pusher.trigger(session.user._id + '-notification', 'message', {
      type: requestType.item,
    })
  }

  await request.delete()

  return res.send('Vous avez refusé la requête.')
}
