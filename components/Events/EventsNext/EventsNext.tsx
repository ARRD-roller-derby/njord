import EventsNextView from './EventsNextView'
import useEventsNext from './useEventsNext'

interface Props {
  readonly id: string
}

export default function EventsNext({ id }: Props) {
  const useProps = useEventsNext(id)
  return <EventsNextView {...useProps} />
}
