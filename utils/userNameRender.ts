import { UserInterface } from '../types/User.interface'

export default function userNameRender(user: UserInterface): string {
  if (user.name && user.lastname) return `${user.name} ${user.lastname}`
  return user.email
}
