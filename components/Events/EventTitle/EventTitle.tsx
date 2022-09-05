import { EventInterface } from '../../../types/Event.interface'
import eventTitleRender from '../../../utils/eventTitleRender'
import classes from './EventTitle.module.css'

interface Props {
  readonly event: EventInterface
  readonly onClick: Function
}
export default function EventTitle({event,onClick}:Props){

  return  <div className={classes.container} data-type={event.type} onClick={()=>onClick()}>
    <div className={classes.type}>{eventTitleRender(event)}</div>
  </div>
}