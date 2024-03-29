import { UserInterface } from '../types/User.interface'
import validator from 'validator'

export default function userNameRender(user: UserInterface | Pick<UserInterface, 'name' | 'lastname' | 'numRoster' | 'derbyName' | 'email'>, withDerbyName?: boolean): string {
  if (withDerbyName && user.derbyName) return validator.unescape(user.derbyName)
  if (user.name && user.lastname) return validator.unescape(`${user.name} ${user.lastname}`)
  return validator.unescape(user.email.split('@')[0])
}
