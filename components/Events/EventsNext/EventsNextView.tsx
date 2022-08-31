import { EventInterface } from '../../../types/Event.interface'
import TrainingCard from '../Training/TrainingCard/TrainingCard'
import classes from './EventsNext.module.css'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel'
import ReactSelect from 'react-select'

interface props {
  readonly events: Array<EventInterface>
  readonly training: Array<EventInterface>
  readonly loading: boolean
  readonly reSync: Function
  readonly id: string
  readonly isMobileDevice: boolean
  readonly setCurrentType: Function
  readonly currentType: { label: string; value: string }
  readonly selectByType: Array<{ label: string; value: string }>
}
export default function EventsNextView({
  events,
  training,
  loading,
  id,
  isMobileDevice,
  currentType,
  selectByType,
  reSync,
  setCurrentType,
}: props) {
  return (
    <div className={classes.container}>
      {currentType && <ReactSelect options={selectByType} />}

      <div className={classes.events} id={id} data-ismobile={isMobileDevice}>
        {events &&
          training.map((event: EventInterface) => (
            <TrainingCard
              key={event._id}
              training={event}
              isMobileDevice={isMobileDevice}
              reSync={reSync}
            />
          ))}
      </div>

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
