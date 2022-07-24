import { useState } from "react";
import { signIn } from "next-auth/react";
import classes from "./LoginForm.module.css";
import Image from "next/image";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!email) {
      toast.error("Il faut renseigner un email valide.");
    } else {
      signIn("email", { email });
    }
  }

  return (
    <form className={classes.container} onSubmit={(e) => handleSubmit(e)}>
      <Image
        src="/static/images/drakarrd.svg"
        alt="logo arrd"
        width={50}
        height={50}
      />
      <h1>{"Njörd"}</h1>
      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button>Se connecter</button>
    </form>
  );
}
