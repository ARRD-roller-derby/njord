import { EventInterface } from '../../../types/Event.interface'
import eventTitleRender from '../../../utils/eventTitleRender'
import classes from './EventTitle.module.css'

interface Props {
  readonly event: EventInterface
}
export default function EventTitle({event}:Props){

  return  <div className={classes.container} data-type={event.type}>
    <div className={classes.type}>{eventTitleRender(event)}</div>
  </div>
}