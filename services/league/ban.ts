import League from '../../models/league.model'
import Notification from '../../models/notification.model'
import User from '../../models/user.model'
import { UserInterface } from '../../types/User.interface'
import userNameRender from '../../utils/userNameRender'

export default async function banLeague(
  userId: string,
  sessionUser: UserInterface
): Promise<UserInterface> {
  const userToEdit = await User.findById(userId),
    leagueToEdit = await League.findById(userToEdit.league.id)

  // delete
  leagueToEdit.admins = leagueToEdit.admins.filter(
    (leagueAdmin: string) => leagueAdmin !== userToEdit._id
  )

  await leagueToEdit.save()

  userToEdit.profiles = []
  userToEdit.league = {}
  //TODO voir à sup uniquement les équipes de la league quand le modèle sera dispo
  userToEdit.teams = []
  await userToEdit.save()

  await Notification.create({
    userId: userToEdit._id,
    type: 'request',
    text: `Vous ne faites plus partie de la league ${leagueToEdit.shortName}`,
    state: 'unread',
    url: '/league',
    updatedAt: new Date(),
  })

  const userName = userNameRender(userToEdit),
    adminName = userNameRender(sessionUser)

  await Notification.create(
    leagueToEdit.admins.filter((id: string) => id !== sessionUser._id).map(
      (id: string) => ({
        userId: id,
        type: 'request',
        text: `${adminName} a supprimé ${userName} de la league`,
        state: 'unread',
        url: '/league',
        updatedAt: new Date(),
      })
    )
  )

  return userToEdit
}