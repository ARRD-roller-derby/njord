import Image from "next/image";
import { User } from "../../types/User.interface";
import classes from "./UserCard.module.css";

interface props {
  user: User;
}
/**
 * Cette `card` est affichée principalement sur la page **Membres**.
 * Elle pourra être affichée aussi sur les **entraînements** ou les **matchs** mais aussi sur les outils de **coaching**.
 */
export default function UserCard({ user }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.avatarContainer}>
        <Image
          className={classes.avatar}
          src={user.avatar || "/tok.webp"}
          alt={`Avatar de ${user.name}`}
          width="75"
          height="75"
        />
      </div>

      <div className={classes.identity}>
        <div className={classes.nameContainer}>
          <span className={classes.name}>{user.name || user.email}</span>{" "}
          <span className={classes.lastname}>{user.lastname}</span>
        </div>

        {user.derbyName && (
          <div className={classes.derbynameContainer}>
            <span className={classes.numRoster}>{user.numRoster}</span>{" "}
            <span className={classes.derbyName}>{user.derbyName}</span>
          </div>
        )}
        {user.leagues.length > 0 && (
          <div className={classes.leagues}>
            {user.leagues.slice(0, 2).map((league) => (
              <div key={league.league.id} className={classes.league}>
                {league.league.name}
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
