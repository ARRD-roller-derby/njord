import { EventInterface } from '../../../types/Event.interface'
import classes from './EventsNext.module.css'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel'
import ReactSelect from 'react-select'
import ScrollHContainer from '../../_ui/ScrollHContainer/ScrollHContainer'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import EventCard from '../EventCard/EventCard'

interface props {
  readonly events: Array<EventInterface>
  readonly loading: boolean
  readonly reSync: ()=>void
  readonly id: string
  readonly setCurrentType: Function
  readonly currentType: { label: string; value: string }
  readonly selectByType: Array<{ label: string; value: string }>
}
export default function EventsNextView({
  events,
  loading,
  currentType,
  selectByType,
  reSync,
  setCurrentType,
}: props) {
  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        {currentType && (
          <ReactSelect
            defaultValue={currentType}
            options={selectByType}
            styles={reactSelectStyle}
            onChange={(choice) => setCurrentType(choice)}
          />
        )}
      </div>

      {events && (
        <ScrollHContainer id={'nextEvents'}>
          {events.map((event: EventInterface) => (
            <EventCard key={event._id} event={event} reSync={reSync} />
          ))}
        </ScrollHContainer>
      )}
      {loading && !events && (
        <div className={classes.noResult}>
          <LoaderWheel />
        </div>
      )}
      {!loading && events?.length === 0 && (
        <div className={classes.noResult}>Aucun événement prévu.</div>
      )}
    </div>
  )
}
