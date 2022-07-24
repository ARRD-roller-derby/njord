import classes from "./UsersWithFilters.module.css";
import { UserInterface } from "../../types/User.interface";
import InputWidthCross from "../_ui/InputWidthCross/InputWidthCross";
import { useState } from "react";
import UserCard from "../UserCard/UserCard";
import { useSession } from "next-auth/react";
import AddUser from "../AddUser/AddUser";

interface props {
  users: Array<UserInterface>;
  reSync: Function;
}
export default function UsersWithFilters({ users, reSync }: props) {
  const { data: session } = useSession(),
    [search, setSearch] = useState<string>("");

  function filterUser(user: UserInterface) {
    let count = 0;
    const fields = ["name", "lastname", "email", "derbyName", "numRoster"];

    fields.forEach((field) => {
      if (user[field]) {
        if (user[field].toLowerCase().includes(search.toLocaleLowerCase())) {
          count++;
        }
      }
    });

    if (user.profiles) {
      if (
        user.profiles.find((o) =>
          o.toLowerCase().includes(search.toLocaleLowerCase())
        )
      ) {
        count++;
      }
    }

    if (user.leagues) {
      if (
        user.leagues.find((o) =>
          o.toLowerCase().includes(search.toLocaleLowerCase())
        )
      ) {
        count++;
      }
    }

    return count;
  }

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <InputWidthCross
          value={search}
          setValue={setSearch}
          placeholder="Rechercher"
        />
      </div>
      <div className={classes.container}>
        <div className={classes.box}>
          <div className={classes.users}>
            {users &&
              users
                .filter(filterUser)
                .map((user: UserInterface) => (
                  <UserCard user={user} key={user._id} />
                ))}
            {session &&
              session.isAdmin &&
              users.filter(filterUser).length === 0 && (
                <AddUser reSync={reSync} defaultValue={search} />
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
