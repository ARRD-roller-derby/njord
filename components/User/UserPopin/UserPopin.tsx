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
  const { close, uri,isMe } = useUserPopin(setClose,url,user),
    props = { close, uri, reSync, user, setClose,isMe }

  return <UserPopinView {...props} />
}
