import Avatar from '../../_ui/Avatar/Avatar'
import classes from './EventAttendeeCard.module.css'
import { Props, useProps } from './EventAttendeeCard.type'

const EventAttendeeCardView = ({user,type}:Props & useProps) => {

  return <div className={classes.container}>
            <div className={classes.avatar}>
          <Avatar src={user.avatar} />
        </div>
    <div className={classes.name}>{user.name}</div>
    {type && <div className={classes.type}>{type}</div>}
  </div>
}

export default EventAttendeeCardView