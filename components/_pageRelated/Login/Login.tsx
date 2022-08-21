import LoginForm from "../../LoginForm/LoginForm";
import AnonymousLayout from "../../_layouts/Anonymous/Anonymous";
import { useEffect } from 'react';
import { indexDB } from "../../../db/indexDB.connect";

export default function Login() {

  //Delete DB cache if disconnect.
  useEffect(()=>{
    indexDB.delete();
  },[]);

  return (
    <AnonymousLayout>
      <LoginForm />
    </AnonymousLayout>
  );
}
