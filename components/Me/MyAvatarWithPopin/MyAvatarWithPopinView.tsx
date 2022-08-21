import { useRef } from 'react'
import classes from './MyAvatarWithPopin.module.css'
import UserModale from '../../User/UserModale/UserModale'
import MyAvatar from '../../_ui/MyAvatar/MyAvatar'
import Xmark from '../../../public/icons/xmark.svg'
import Image from 'next/image'

interface props {
  readonly close: Function
  readonly setShow: Function
  readonly show: boolean
  readonly avatarUrl: string
}

export default function MyAvatarWithPopinView({
  close,
  setShow,
  show,
  avatarUrl,
}: props) {
  const ref = useRef(null)

  return (
    <div className={classes.container} ref={ref}>
      <div
        className={classes.avatar}
        onClick={() => setShow(!show)}
        data-testid="avatar"
        data-ignore="true"
      >
        {show ? (
          <Image src={Xmark} alt="croix" width={20} height={20} data-testid="avatar-cross"/>
        ) : (
          <MyAvatar url={avatarUrl} />
        )}
      </div>
      <UserModale parentRef={ref} setShow={close} show={show} />
    </div>
  )
}
