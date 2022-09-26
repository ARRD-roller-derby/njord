import Factory from '../../_layouts/Factory/Factory';
import { Props,useProps } from './EventAttendeeCard.type';
import EventAttendeeCardView from './EventAttendeeCardView';
import useEventAttendeeCard from './useEventAttendeeCard';

const EventAttendeeCard = Factory<Props,useProps>(useEventAttendeeCard,EventAttendeeCardView)
export default EventAttendeeCard