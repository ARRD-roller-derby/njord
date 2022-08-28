import classes from './TrainingCard.module.css'
import dayjs from 'dayjs'
import { EventInterface } from '../../../../types/Event.interface'

interface props {
  readonly training: EventInterface
}

export default function TrainingCard({ training }:props) {
  return (
    <div className={classes.container}>
      <div className={classes.containerDate}>
        <div className={classes.date}>{dayjs(training.start).format('LL')}</div>
        <div className={classes.relativeDate}>
          {dayjs(training.start).from(dayjs())}
        </div>
      </div>
      <div className={classes.hour}>
        de {training.hourStart} à {training.hourEnd}
      </div>
      {training.address && <div className={classes.address}>{training.address.street}{', '}{training.address.zipcode} {training.address.city}</div>
      }
      <div className={classes.labelPresence}>Je serai{':'}</div>
      <div className={classes.actions}>
      <button>Absent</button>
        <button>Présent</button>
      </div>
    </div>
  )
}
