import { UserInterface } from '../../../types/User.interface'
import Avatar from '../../_ui/Avatar/Avatar'
import classes from './UserCard.module.css'

interface props {
  readonly user: UserInterface
  readonly handleClick: Function
}

export default function UserCardView({ user, handleClick }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.avatarContainer}>
        <div className={classes.avatar}>
          <Avatar src={user.avatar} />
        </div>
      </div>
      {/** Use Shallow for change url without redirect. if reload, is effect. */}
      <div className={classes.identity} onClick={() => handleClick()}>
        <div className={classes.nameContainer}>
          <span className={classes.name}>{user.name || user.email}</span>{' '}
          <span className={classes.lastname}>{user.lastname}</span>
        </div>

        {user.derbyName && (
          <div className={classes.derbynameContainer}>
            {'#'}
            <span className={classes.numRoster}>{user.numRoster}</span>{' '}
            <span className={classes.derbyName}>{user.derbyName}</span>
          </div>
        )}
        <div className={classes.teams}>
          {user.teams.map((team) => (
            <div key={team} className={classes.team}>
              {team}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
