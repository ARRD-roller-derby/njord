import League from '../../models/league.model'
import Notification from '../../models/notification.model'
import User from '../../models/user.model'
import { UserInterface } from '../../types/User.interface'
import userNameRender from '../../utils/userNameRender'
import validator from 'validator'

export default async function updateProfiles(
  userId: string,
  sessionUser: UserInterface,
  profiles: Array<string>
): Promise<UserInterface> {
  const userToEdit = await User.findById(userId),
    leagueToEdit = await League.findById(userToEdit.league.id)

  userToEdit.profiles = profiles.map((profile) => validator.escape(profile))
  await userToEdit.save()

  const isBureau = userToEdit.profiles.find((profile) => profile === 'bureau'),
    isallreadyAdmin = leagueToEdit.admins.find((id) => id === userToEdit._id)

  if (isBureau && !isallreadyAdmin) {
    leagueToEdit.admins.push(userToEdit)
    await leagueToEdit.save()
  }

  if (!isBureau && isallreadyAdmin) {
    leagueToEdit.admins = leagueToEdit.admins.filter(
      (id) => id !== userToEdit._id
    )
    await leagueToEdit.save()
  }

  await Notification.create({
    userId: userToEdit._id,
    type: 'request',
    text: `Vos profils ont été mis à jour`,
    state: 'unread',
    url: '/league',
    updatedAt: new Date(),
  })

  const userName = userNameRender(userToEdit),
    adminName = userNameRender(sessionUser)

  await Notification.create(
    leagueToEdit.admins
      .filter((id: string) => id !== sessionUser._id)
      .map((id: string) => ({
        userId: id,
        type: 'request',
        text: `${adminName} a modifié les profiles de ${userName}`,
        state: 'unread',
        url: '/league',
        updatedAt: new Date(),
      }))
  )

  return userToEdit
}
