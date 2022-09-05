import EventShutterView from './EventShutterView'
import useEventShutter from './useEventShutter'
import { EventInterface } from '../../../types/Event.interface';

interface props {
  readonly event: EventInterface
  readonly setClose: Function
  readonly reSync: Function
  readonly url: string
}

export default function EventShutter(props: props) {
  const useProps = useEventShutter(props)

  return <EventShutterView {...props} {...useProps} />
}
