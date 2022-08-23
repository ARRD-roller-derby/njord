import classes from './Calendar.module.css'
import { CalDayInterface } from '../../../types/CalDay.interface'
import CalendarDay from '../CalendarDay/CalendarDay'
import { EventInterface } from '../../../types/Event.interface'
import EventCreateForm from '../../Events/EventCreateForm/EventCreateForm'

interface props {
  readonly cal: Array<any>
  readonly currentMonth: string
  readonly currentMonthNum: number
  readonly nextMonth: Function
  readonly previousMonth: Function
  readonly isMobile: boolean
  readonly isAdmin: boolean
  readonly setPopin: Function
  readonly refetch: Function
  readonly popin: EventInterface | 'create' | null
}

export default function CalendarView({
  cal,
  currentMonthNum,
  nextMonth,
  currentMonth,
  previousMonth,
  isMobile,
  isAdmin,
  setPopin,
  refetch,
  popin,
}: props) {
  return (
    <div className={classes.container}>
      {typeof popin === 'string' && popin === 'create' && (
        <EventCreateForm onClose={() => setPopin(null)} refetch={refetch}/>
      )}
      <h1 className={classes.title}>{currentMonth}</h1>
      <div className={classes.calendar} data-ismobile={isMobile}>
        {[
          'lundi',
          'mardi',
          'mercredi',
          'jeudi',
          'vendredi',
          'samedi',
          'dimanche',
        ].map((day) => (
          <div className={classes.header} key={day}>
            {isMobile ? day.slice(0, 3) + '.' : day}
          </div>
        ))}
        {cal.map((day: CalDayInterface) => (
          <CalendarDay
            day={day}
            setPopin={setPopin}
            currentMonthNum={currentMonthNum}
            key={day.day.toString()}
          />
        ))}
      </div>
      <div className={classes.buttons}>
        <button onClick={() => previousMonth()}>précedent</button>
        {isAdmin && <button onClick={() => setPopin('create')}>+</button>}
        <button onClick={() => nextMonth()}>suivant</button>
      </div>
    </div>
  )
}
