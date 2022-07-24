import classes from "./AddUserf.module.css";
import { useState } from "react";
import FullscreenModale from "../_ui/FullscreenModale/FullscreenModale";
import FormAddUser from "../FormAddUser/FormAddUser";

interface props {
  readonly reSync: Function;
  readonly defaultValue:string
}

export default function AddUser({ defaultValue }: props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className={classes.container}>
      {isOpen && (
        <FullscreenModale setClose={handleClose}>
          <FormAddUser setClose={handleClose}  defaultValue={defaultValue}/>
        </FullscreenModale>
      )}
      <button onClick={() => setIsOpen(true)}>Ajouter un utilisateur</button>
    </div>
  );
}
