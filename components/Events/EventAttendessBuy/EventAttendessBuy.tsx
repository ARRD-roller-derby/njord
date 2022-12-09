import EventAttendessBuyView from "./EventAttendessBuyView";
import useEventAttendessBuy from "./useEventAttendessBuy";

interface Props {
  eventId: string
}

export default function EventAttendessBuy(props: Props) {
  const useProps = useEventAttendessBuy()

  return <EventAttendessBuyView {...props} {...useProps} />
}