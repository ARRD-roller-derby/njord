import { UserInterface } from '../types/User.interface'
import validator from 'validator'

export default function userNameRender(user: UserInterface, withDerbyName?: boolean): string {
  if (withDerbyName && user.derbyName) return validator.unescape(user.derbyName)
  if (user.name && user.lastname) return validator.unescape(`${user.name} ${user.lastname}`)
  return validator.unescape(user.email.split('@').at(0))
}
