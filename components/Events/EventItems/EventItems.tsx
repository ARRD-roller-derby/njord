import EventItemsView from './EventItemsView'
import useEventItems from './useEventItems'

interface Props {
  readonly eventId: string
}
export default function EventItems(props:Props){
  const useProps = useEventItems(props)
  return <EventItemsView {...useProps} />
}