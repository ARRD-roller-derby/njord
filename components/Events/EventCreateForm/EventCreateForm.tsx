import EventCreateFormView from "./EventCreateFormView";
import useEventCreateForm from './useEventCreateForm';

interface Props {
  readonly onClose: Function
  readonly refetch: Function
  readonly defaultDate: string
}

export default function EventCreateForm(props:Props){
  const useProps = useEventCreateForm(props);

  return <EventCreateFormView {...props} {...useProps}/>
}