import { AttendeeInterface } from '../../../types/attendee.interface'
import Avatar from '../../_ui/Avatar/Avatar'
import classes from './EventAttendeeCard.module.css'

interface Props {
readonly user: AttendeeInterface
readonly type?: string

}
export default function EventAttendeeCardView({user,type}:Props){

  return <div className={classes.container}>
            <div className={classes.avatar}>
          <Avatar src={user.avatar} />
        </div>
    <div className={classes.name}>{user.name}</div>
    {type && <div className={classes.type}>{type}</div>}
  </div>
}