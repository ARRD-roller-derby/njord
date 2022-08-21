import UserAddView from './UserAddView';
import useUserAdd from './useUserAdd'

interface props {
  readonly reSync: Function
  readonly defaultValue: string
  readonly openPopin: Function
}

export default function UserAdd({ defaultValue, openPopin, reSync }: props) {
  const { isOpen, handleClose, handleOpen } = useUserAdd(openPopin)

  return (
    <UserAddView
      defaultValue={defaultValue}
      isOpen={isOpen}
      handleOpen={handleOpen}
      handleClose={handleClose}
      reSync={reSync}
      
    />
  )
}
