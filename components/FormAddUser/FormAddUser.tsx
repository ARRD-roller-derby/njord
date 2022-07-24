/* eslint-disable react-hooks/exhaustive-deps */
import classes from "./FormAddUser.module.css";
import { useState, useEffect } from "react";
import usePost from "../_hooks/usePost";
import { useRouter } from "next/router";

interface props {
  readonly setClose: Function;
  readonly defaultValue:string
}

export default function FormAddUser({ setClose ,defaultValue}: props) {
  const { post, loading, data } = usePost("/users/add"),
    router = useRouter(),
    [email, setEmail] = useState<string>(defaultValue);

  function handleSubmit(e) {
    e.preventDefault();
    post({ email });
  }

  useEffect(() => {
    if (data) {
      router.push("/membre/" + data._id);
    }
  }, [data]);

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <h2 className={classes.title}>Ajouter un utilisateur</h2>
      <label htmlFor="email-add">{"email: "}</label>
      <input
        autoFocus
        id="email-add"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button disabled={loading}>ajouter</button>
    </form>
  );
}
