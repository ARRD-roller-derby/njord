import EventCancelButtonView from "./EventCancelButtonView";
import useEventCancelButton from "./useEventCancelButton";

interface Props {
  readonly eventId: string
  readonly setClose: Function
  readonly reSync: Function
}

export default function EventCancelButton(props:Props){
  const useProps = useEventCancelButton(props)

  return <EventCancelButtonView {...useProps}/>
}