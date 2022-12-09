import EventAttendessBuyView from "./EventAttendessBuyView";
import useEventAttendessBuy from "./useEventAttendessBuy";

interface Props {
  reSync: Function
  eventId: string
}

export default function EventAttendessBuy(props: Props) {
  const useProps = useEventAttendessBuy(props)

  return <EventAttendessBuyView {...props} {...useProps} />
}