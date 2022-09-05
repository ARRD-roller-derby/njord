import { UserInterface } from './User.interface';
export interface SessionInterface {
  readonly isAdmin:boolean
  readonly user: UserInterface
}