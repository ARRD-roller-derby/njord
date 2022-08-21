import classes from "./Verify.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import AnonymousLayout from "../../_layouts/Anonymous/Anonymous";

export default function Verify() {
  const { push } = useRouter(),
    { data: session } = useSession();

  function handleRedirect() {
    push("/login");
  }

  useEffect(() => {
    if (session && session.user) {
      push("/");
    }
  }, [session]);

  return (
    <AnonymousLayout>
      <div className={classes.container}>
        <Image
          src="/static/images/drakarrd.svg"
          alt="logo arrd"
          width={50}
          height={50}
        />
        <div className={classes.message}>
          {`Vous allez recevoir un email vous permettant de vous connecter`}
        </div>
        <button onClick={handleRedirect}>
          Retourner à la page de connexion
        </button>
      </div>
    </AnonymousLayout>
  );
}
