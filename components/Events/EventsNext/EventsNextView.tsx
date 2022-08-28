import { DivIcon } from 'leaflet'
import events from '../../../pages/api/events/events'
import { EventInterface } from '../../../types/Event.interface'
import TrainingCard from '../Training/TrainingCard/TrainingCard'
import classes from './EventsNext.module.css'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel';

interface props {
  readonly events: Array<EventInterface>
  readonly training: Array<EventInterface>
  readonly loading: boolean
}
export default function EventsNextView({events,training,loading}:props){

  return <div className={classes.container}>
    
    {events && training.map((event:EventInterface)=><TrainingCard key={event._id} training={event}/>)}
    {(loading && !events) && <div className={classes.noResult}><LoaderWheel/></div>}
    {(events && events.length === 0) && <div className={classes.noResult}>Aucun événement prévu.</div>}
    </div>
}