import RecurrenceSelectorView from "./RecurrenceSelectorView"
import useRecurrenceSelector from "./useRecurrenceSelector"

interface Props {
  readonly setValue:Function
}
export default function RecurrenceSelector(props:Props){
const useProps = useRecurrenceSelector(props)
  return <RecurrenceSelectorView {...useProps}/>
}