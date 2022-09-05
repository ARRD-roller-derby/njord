import { AttendeeInterface } from '../../../types/attendee.interface'
import EventAttendeeCardView from './EventAttendeeCardView';
import useEventAttendeeCard from './useEventAttendeeCard';


interface Props {
readonly user: AttendeeInterface
readonly eventType: string
}
export default function EventAttendeeCard(props:Props){
  const useProps = useEventAttendeeCard(props)

  return <EventAttendeeCardView {...props} {...useProps}/>
}