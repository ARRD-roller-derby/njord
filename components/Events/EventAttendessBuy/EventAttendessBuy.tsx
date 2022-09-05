import EventAttendessBuyView from "./EventAttendessBuyView";
import useEventAttendessBuy from "./useEventAttendessBuy";

interface Props {
  readonly reSync:Function
}

export default function EventAttendessBuy(props:Props){
  const useProps = useEventAttendessBuy(props)

  return <EventAttendessBuyView {...useProps} />
}