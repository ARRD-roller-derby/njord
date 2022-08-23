import classes from './Calendar.module.css'
import { CalDayInterface } from '../../../types/CalDay.interface'
import CalendarDay from '../CalendarDay/CalendarDay'
import { EventInterface } from '../../../types/Event.interface'

interface props {
  readonly cal: Array<any>
  readonly currentMonth: string
  readonly currentMonthNum: number
  readonly nextMonth: Function
  readonly previousMonth: Function
  readonly isMobile: boolean
  readonly isAdmin: boolean
  readonly setPopin: Function
  readonly popin: EventInterface|null
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
  popin
}: props) {

  //TODO

  /**
   * la popin peut être create, ou un shutter si events dedans, donc 2 conditions
   * ou type comme condition
   */
  return (
    <div className={classes.container}>
      {/** AJOUTER LA MODALE */}
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
          <CalendarDay day={day} setPopin={setPopin} currentMonthNum={currentMonthNum} key={day.day.toString()}/>
        ))}
      </div>
      <div className={classes.buttons}>
        <button onClick={() => previousMonth()}>précedent</button>
        {isAdmin && <button onClick={() => console.log('this button is a component')}>+</button>}
        <button onClick={() => nextMonth()}>suivant</button>
      </div>
    </div>
  )
}
