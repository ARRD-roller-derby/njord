import EventView from './EventView';
import useEvent from './useEvent';

interface props {
  readonly id: string
}

export default function Event({id}:props) {
  const props = useEvent(id);
  return <EventView {...props}/>
}
