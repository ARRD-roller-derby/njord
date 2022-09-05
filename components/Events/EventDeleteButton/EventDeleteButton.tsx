import EventDeleteButtonView from "./EventDeleteButtonView";
import useEventDeleteButton from "./useEventDeleteButton";

interface Props {
  readonly eventId: string
  readonly setClose: Function
  readonly reSync: Function
}

export default function EventDeleteButton(props:Props){
  const useProps = useEventDeleteButton(props)

  return <EventDeleteButtonView {...useProps}/>
}