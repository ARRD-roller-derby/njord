/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";
import classes from "./UserModale.module.css";
import clickOutside from "../../utils/clickOutside";
import Link from "next/link";
import MyAvatar from "../_ui/MyAvatar/MyAvatar";
import { useSession } from "next-auth/react";

interface props {
  readonly setShow: Function;
  readonly parentRef: any;
}

export default function UserModale({ setShow, parentRef }: props) {
  const { data: session } = useSession(),
    ref = useRef(null);

  useEffect(
    () =>
      clickOutside([parentRef], () => {
        setShow();
      }),
    []
  );

  return (
    <div className={classes.container} ref={ref}>
      {session && session.user && (
        <>
          <div className={classes.name}>
            {session.user.name || session.user.email.split("@")[0]}
          </div>
          <div className={classes.email}>{session.user.email}</div>
        </>
      )}
      <Link href="/api/auth/logout" passHref>
        <a className={classes.deco}>Se déconnecter</a>
      </Link>
      <Link href="/profil" passHref>
        <button className={classes.link} onClick={() => setShow(false)}>
          Gérer mon profil
        </button>
      </Link>
    </div>
  );
}
