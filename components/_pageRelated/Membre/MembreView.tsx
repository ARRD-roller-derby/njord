import { UserInterface } from '../../../types/User.interface'
import UserBlockContact from '../../User/UserBlockContact/UserBlockContact'
import UserBlockDerby from '../../User/UserBlockDerby/UserBlockDerby'
import UserBlockIndentity from '../../User/UserBlockIndentity/UserBlockIndentity'
import UserBlockLeague from '../../User/UserBlockLeague/UserBlockLeague'
import UserChangeAvatarButton from '../../User/UserChangeAvatarButton/UserChangeAvatarButton'
import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated'
import classes from './Membre.module.css'

interface props {
  readonly user: UserInterface
  readonly reSync: Function
  readonly uri: string
  readonly isMe:boolean
}

export default function MembreView({ user, reSync, uri,isMe }: props) {
  return (
    <AuthentificatedLayout>
      <div className={classes.container}>
      {user ? <div className={classes.user}>
        {isMe && <UserChangeAvatarButton reSync={reSync}/>}
        <UserBlockIndentity user={user} uri={uri} reSync={reSync} />
        <UserBlockContact user={user} uri={uri} reSync={reSync} />
        <UserBlockDerby user={user} uri={uri} reSync={reSync} />
        <UserBlockLeague user={user} uri={uri} reSync={reSync} />
        </div>:<>Utilisateur inconnu</>}

      </div>
    </AuthentificatedLayout>
  )
}
