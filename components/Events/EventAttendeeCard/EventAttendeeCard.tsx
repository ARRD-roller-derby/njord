import { AttendeeInterface } from '../../../types/attendee.interface'
import Factory from '../../_layouts/Factory/Factory';
import EventAttendeeCardView from './EventAttendeeCardView';
import useEventAttendeeCard from './useEventAttendeeCard';

interface Props {
readonly user: AttendeeInterface
readonly eventType: string
}

const EventAttendeeCard = Factory<Props>(useEventAttendeeCard,EventAttendeeCardView)
export default EventAttendeeCard