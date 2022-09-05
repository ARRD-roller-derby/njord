import classes from './UserAdd.module.css'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import UserAddForm from '../UserAddForm/UserAddForm'

interface props {
  readonly reSync: Function
  readonly defaultValue: string
  readonly handleClose: Function
  readonly handleOpen: Function
  readonly isOpen: boolean
}

export default function UserAddView({
  defaultValue,
  isOpen,
  handleClose,
  handleOpen,
  reSync,
}: props) {
  return (
    <div className={classes.container}>
      {isOpen && (
        <FullscreenModale setClose={handleClose}>
          <UserAddForm
            setClose={handleClose}
            defaultValue={defaultValue}
            reSync={reSync}
          />
        </FullscreenModale>
      )}
      <button onClick={() => handleOpen()}>Ajouter un utilisateur</button>
    </div>
  )
}
