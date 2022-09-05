import { AttendeeInterface } from '../../../types/attendee.interface'
import classes from './EventAttendeeCard.module.css'


interface Props {
readonly user: AttendeeInterface
readonly type?: string

}
export default function EventAttendeeCardView({user,type}:Props){

  return <div className={classes.container}>
    <div className={classes.name}>{user.name}</div>
    {type && <div className={classes.type}>{type}</div>}
  </div>
}