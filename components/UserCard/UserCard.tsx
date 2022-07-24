import Link from "next/link";
import { UserInterface } from "../../types/User.interface";
import Avatar from "../_ui/Avatar/Avatar";
import classes from "./UserCard.module.css";
import { useRouter } from 'next/router';

interface props {
  user: UserInterface;
}

export default function UserCard({ user }: props) {
  const router = useRouter();


  //TODO remettre l'url quand on ferme la modale membre.

  return (
    <div className={classes.container}>
      <div className={classes.avatarContainer} >
        <div className={classes.avatar}>
          <Avatar src={user.avatar} />
        </div>
      </div>
      {/** Use Shallow for change url without redirect. if reload, is effect. */}
      <div className={classes.identity} onClick={()=>router.push('/membres', '/membre/'+ user._id, { shallow: true })}>
        <div className={classes.nameContainer}>
          <span className={classes.name}>{user.name || user.email}</span>{" "}
          <span className={classes.lastname}>{user.lastname}</span>
        </div>

        {user.derbyName && (
          <div className={classes.derbynameContainer}>
            {"# "}
            <span className={classes.numRoster}>{user.numRoster}</span>{" "}
            <span className={classes.derbyName}>{user.derbyName}</span>
          </div>
        )}
        {user.leagues.length > 0 && (
          <div className={classes.leagues}>
            {user.leagues.slice(0, 2).map((league) => (
              <div key={league} className={classes.league}>
                {league}
              </div>
            ))}
            {user.leagues.length > 2 && (
              <div className={classes.league}>...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
