import { useRef, useEffect } from 'react';
import classes from './UserModale.module.css';
import clickOutside from '../../utils/clickOutside';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { User } from '../../types/User.interface';

interface props {
  readonly user: User;
  readonly setShow: Function;
  readonly parentRef: any;
}
export default function UserModale({ setShow, user, parentRef }: props) {
  const ref = useRef(null);

  useEffect(() => {
    const topPosition =
      parentRef.current.offsetTop + parentRef.current.offsetHeight + 10;
    ref.current.style.top = `${topPosition}px`;
  }, []);

  useEffect(
    () =>
      clickOutside([ref], () => {
        setShow();
      }),
    []
  );

  return (
    <div className={classes.container} ref={ref}>
      <div className={classes.containerAvatar}>
        <div className={classes.avatar}>
          <img
            src={user.avatar || '/tok.webp'}
            alt="avatar"
            width="40"
            height="40"
            onError={(e: any) => (e.target.src = '/tok.webp')}
          />
        </div>
        <div className={classes.name}>
          {user.name || user.email.split('@')[0]}
        </div>
        <div className={classes.email}>{user.email}</div>
      </div>
      <div className={classes.deco} onClick={() => signOut()}>
        Se déconnecter
      </div>

      <Link href="/profil">
        <button className={classes.link} onClick={() => setShow(false)}>
          Gérer mon profil
        </button>
      </Link>
    </div>
  );
}
