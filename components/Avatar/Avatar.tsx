import { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import classes from './Avatar.module.css';
import UserModale from '../UserModale/UserModale';
import { useSession } from 'next-auth/react';

export default function Avatar({ onClose }: { onClose?: Function }) {
  const { data: session } = useSession(),
    [show, setShow] = useState<boolean>(false),
    ref = useRef(null);
  //TODO ajouter un compteur de notif

  function handleClose() {
    setShow(false);
    onClose && onClose(false);
  }

  return (
    <>
      <div
        className={classes.avatar}
        onClick={()=> setShow(!show)}
        ref={ref}
        data-testid="avatar"
        data-ignore="true"
      >
        <img
          src={session?.user.avatar || '/tok.webp'}
          alt="avatar"
          width="40"
          height="40"
          data-ignore="true"
          onError={(e: any) => (e.target.src = '/tok.webp')}
        />
      </div>
      {session && (
        <CSSTransition
          in={show}
          timeout={300}
          classNames="alert"
          unmountOnExit
          mountOnEnter
        >
          <UserModale
            setShow={handleClose}
            user={session.user}
            parentRef={ref}
          />
        </CSSTransition>
      )}
    </>
  );
}
