import classes from './UserModale.module.css'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import SmallModale from '../../_ui/SmallModale/SmallModale'

interface props {
  readonly setShow: Function
  readonly parentRef: any
  readonly show: boolean
}

export default function UserModale({ setShow, parentRef, show }: props) {
  //search
  const { data: session } = useSession()

  return (
    <SmallModale setShow={setShow} parentRef={parentRef} show={show}>
      {session && session.user && (
        <>
          <div className={classes.name}>
            {session.user.name || session.user.email.split('@')[0]}
          </div>
          <div className={classes.email}>{session.user.email}</div>
        </>
      )}
      <div className={classes.deco} onClick={() => signOut()}>
        Se déconnecter
      </div>
      <Link href="/profile" passHref>
        <button className={classes.link} onClick={() => setShow(false)}>
          Gérer mon profil
        </button>
      </Link>
    </SmallModale>
  )
}
