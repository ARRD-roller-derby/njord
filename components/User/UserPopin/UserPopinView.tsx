import classes from './UserPopin.module.css'
import { UserInterface } from '../../../types/User.interface'
import ArrowUpRightFromSquare from '../../../public/icons/arrow-up-right-from-square.svg'
import Link from 'next/link'
import Image from 'next/image'
import UserBlockIndentity from '../UserBlockIndentity/UserBlockIndentity'
import UserBlockContact from '../UserBlockContact/UserBlockContact'
import UserBlockDerby from '../UserBlockDerby/UserBlockDerby'
import ShutterModale from '../../_ui/ShutterModale/ShutterModale'
import UserBlockLeague from '../UserBlockLeague/UserBlockLeague'
import UserChangeAvatarButton from '../UserChangeAvatarButton/UserChangeAvatarButton'
import Avatar from '../../_ui/Avatar/Avatar'

interface props {
  readonly user: UserInterface
  readonly setClose: Function
  readonly reSync: Function
  readonly close: Function
  readonly uri: string
  readonly isMe: boolean
}

export default function UserPopinView({
  user,
  isMe,
  uri,
  close,
  reSync,
}: props) {
  return (
    <ShutterModale setClose={close} show={!!user}>
      {user && (
        <div className={classes.container}>
          <Link href={`/user/${user._id}`} passHref>
            <h1 className={classes.title}>
              <div>Fiche membre</div>
              <Image
                src={ArrowUpRightFromSquare}
                width={20}
                height={20}
                alt="icon link"
              />
            </h1>
          </Link>
          {isMe ? (
            <UserChangeAvatarButton reSync={reSync} />
          ) : (
            <div className={classes.avatarContainer}>
              <div className={classes.avatar}>
              <Avatar src={user.avatar} size={50} />
              </div>
            </div>
          )}
          <UserBlockIndentity user={user} uri={uri} reSync={reSync} />
          <UserBlockContact user={user} uri={uri} reSync={reSync} />
          <UserBlockDerby user={user} uri={uri} reSync={reSync} />
          <UserBlockLeague user={user} uri={uri} reSync={reSync} />
        </div>
      )}
    </ShutterModale>
  )
}
