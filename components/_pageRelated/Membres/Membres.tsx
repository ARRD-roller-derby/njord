import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated";
import classes from "./Membres.module.css";
import useDBSync from "../../_hooks/useDBSync";
import UsersWithFilters from "../../UsersWithFilters/UsersWithFilters";

export default function Membres() {
  const { data: users,reSync } = useDBSync("/users/users", "users");

  return (
    <AuthentificatedLayout>
      <div className={classes.container}>
        <h1 className={classes.title}>Membres</h1>
        <UsersWithFilters users={users} reSync={reSync}/>
      </div>
    </AuthentificatedLayout>
  );
}
