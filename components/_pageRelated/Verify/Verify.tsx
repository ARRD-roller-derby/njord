import classes from "./Verify.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AnonymousLayout from "../../_layouts/Anonymous/Anonymous";
import SubmitButton from "../../_ui/SubmitButton/SubmitButton";
import usePost from "../../_hooks/usePost";

export default function Verify() {
  const [code, setCode] = useState("");
  const { post, loading, data: url } = usePost('users/verify');
  const { push } = useRouter(),
    { data: session } = useSession();

  function handleRedirect() {
    push("/login");
  }

  useEffect(() => {
    if (url) {
      window.location.href = url;
    }
  }, [url]
  )

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
          {`Entrez le code de vérification que vous avez reçu par email.`}
        </div>
        <div className={classes.form} >
          <input autoFocus type="text" value={code} onChange={(e) => setCode(e.target.value.toUpperCase().replace(' ', ''))} />
          <SubmitButton text="Se connecter" loading={loading} onClick={() => post({ code })} />
        </div>
        <button onClick={handleRedirect}>
          Retourner à la page de connexion
        </button>
      </div>
    </AnonymousLayout>
  );
}
