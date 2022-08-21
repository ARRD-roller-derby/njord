import { UserInterface } from '../../../types/User.interface'
import useUserPopin from './useUserPopin'
import UserPopinView from './UserPopinView'

interface props {
  readonly user: UserInterface
  readonly setClose: Function
  readonly reSync: Function
  readonly url: string
}

export default function UserPopin({ user, setClose, reSync,url }: props) {
  const { close, uri } = useUserPopin(setClose,url),
    props = { close, uri, reSync, user, setClose }

  return <UserPopinView {...props} />
}
