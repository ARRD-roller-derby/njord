import { useContext, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import classes from "./MyAvatarWithPopin.module.css";
import UserModale from "../UserModale/UserModale";
import { useSession } from "next-auth/react";
import MyAvatar from "../_ui/MyAvatar/MyAvatar";
import Xmark from "../../public/icons/xmark.svg";
import Image from "next/image";

/**
 *
 * ## Définition
 * Affiche l'avatar ainsi que le compteur de notification.
 * Si aucun nom d'utilisateur n'est renseigné (pour la première connexion par exemple),
 * c'est la première partie de l'email qui est affiché à la place du nom.
 */
export default function MyAvatarWithPopin({ onClose }: { onClose?: Function }) {
  const { data: session } = useSession(),
    [show, setShow] = useState<boolean>(false),
    ref = useRef(null);

  function handleClose() {
    setShow(false);
    onClose && onClose(false);
  }

  return session?.user ? (
    <div className={classes.container} ref={ref}>
      <div
        className={classes.avatar}
        onClick={()=>setShow(!show)}
        data-testid="avatar"
        data-ignore="true"
      >
      {show ? <Image src={Xmark} alt='croix' width={20} height={20}/> : <MyAvatar /> }
      </div>
      <CSSTransition
        in={show}
        timeout={300}
        classNames="alert"
        unmountOnExit
        mountOnEnter
      >
        <UserModale parentRef={ref} setShow={handleClose} />
      </CSSTransition>
    </div>
  ) : (
    <div className={classes.avatar}>...</div>
  );
}
