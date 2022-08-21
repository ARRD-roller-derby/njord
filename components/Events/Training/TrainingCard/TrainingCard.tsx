import classes from './TrainingCard.module.css'
import dayjs from 'dayjs'

export default function TrainingCard({ training }) {
  return (
    <div className={classes.container}>
      <div className={classes.containerDate}>
        <div className={classes.date}>{dayjs(training.date).format('LL')}</div>
        <div className={classes.relativeDate}>
          {dayjs(training.date).from(dayjs())}
        </div>
      </div>
      <div className={classes.hour}>
        de {training.startHour} à {training.endHour}
      </div>
      <div className={classes.address}>5, rue Ernest Danet, 76150 Maromme</div>
      <div className={classes.require}>
        <span className={classes.labelRequire}>Requis{': '}</span>2 maillots
      </div>
      <div className={classes.labelPresence}>Je serais{':'}</div>
      <div className={classes.actions}>
        <button>Absent</button>
        <button>NSO/SO</button>
        <button>Sur Patins</button>
      </div>
    </div>
  )
}
