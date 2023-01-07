import { UserInterface } from '../types/User.interface'
import validator from 'validator'

export default function userNameRender(user: UserInterface): string {
  if (user.name && user.lastname) return validator.unescape(`${user.name} ${user.lastname}`)
  return validator.unescape(user.email.split('@').at(0))
}
