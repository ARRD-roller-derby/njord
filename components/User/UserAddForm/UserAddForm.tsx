import UserAddFormView from './UserAddFormView'
import useUserAddForm from './useUserAddForm'

interface props {
  readonly setClose: Function
  readonly defaultValue: string
  readonly reSync: Function
}

export default function UserAddForm({ setClose, reSync, defaultValue }: props) {
  const props = useUserAddForm({ setClose, reSync, defaultValue })

  return <UserAddFormView {...props} />
}
