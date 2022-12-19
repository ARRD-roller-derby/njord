import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import useIsMobile from '../_hooks/useIsMobile'
import useLocalState from '../_hooks/useLocalState'
import { CalDayInterface } from '../../types/CalDay.interface'
import { useSession } from 'next-auth/react'
import { EventInterface } from '../../types/Event.interface'
interface Props {
  readonly refetch: Function
  readonly setBetween: Function
  readonly events: Array<EventInterface>
}

export default function useCalendar({ setBetween, events }: Props) {
  const { data: session } = useSession(),
    { localState, setLocalState } = useLocalState<{
      year: number
      month: any
    }>(
      {
        year: dayjs().year(),
        month: parseInt(dayjs().format('MM')) - 1,
      },
      'njord_yearMonth'
    ),
    [cal, setCal] = useState<Array<CalDayInterface>>([]),
    [popin, setPopin] = useState<string | null>(null),
    [mobileEvents, setMobileEvents] = useState<Array<EventInterface> | null>(null),
    [currentMonth, setCurrentMonth] = useState<string>(''),
    isMobile = useIsMobile()

  function createCalendar() {

    //for breaking change year
    if (localState.year === 0) {
      setLocalState({
        ...localState,
        year: dayjs().year(),
      })
    }

    const thisMonth = dayjs().set('year', localState.year).month(localState.month ?? dayjs(dayjs().format('MM'))),
      firstDay = dayjs(thisMonth).startOf('month'),
      lastDay = dayjs(thisMonth).endOf('month'),
      firstCalDay = firstDay.subtract(
        firstDay.day() - 1,
        'day'
      ),
      lastCalDay = lastDay.add(
        lastDay.day() === 0 ? 0 : 7 - lastDay.day(),
        'day'
      ),
      numOfDay = lastCalDay.diff(firstCalDay, 'day'),
      generateCal = []

    setBetween([firstCalDay.toISOString(), lastCalDay.toISOString()])

    for (let i = 0; i < numOfDay + 1; i++) {
      const day = firstCalDay.add(i, 'day')
      generateCal.push({
        date: day,
        month: day.month(),
        day: day.day(),
        events: [],
      })
    }

    setCurrentMonth(
      dayjs()
        .month(localState.month)
        .set('year', localState.year)
        .format('MMMM YYYY')
    )
    //sometimes, one day add
    setCal(generateCal.slice(0, 35))
  }

  function nextMonth() {
    const next = localState.month + 1
    if (next >= 12) {
      setLocalState({
        year: localState.year + 1,
        month: 0,
      })

    } else {
      setLocalState({
        ...localState,
        month: next,
      })
    }

  }

  function previousMonth() {
    const previous = localState.month - 1
    if (previous < 0) {
      setLocalState({
        year: localState.year - 1,
        month: 11,
      })
    } else {
      setLocalState({
        ...localState,
        month: previous,
      })
    }
  }

  useEffect(() => {
    if (localState) {
      createCalendar()
    }
  }, [localState])

  useEffect(() => {
    if (events) {
      const newCal = [...cal]
      setCal(
        newCal.map((day) => ({
          ...day,
          events: events.filter(
            (event) =>
              dayjs(event.start).format('DD-MM-YY') ===
              day.date.format('DD-MM-YY')
          ),
        }))
      )
    }
  }, [events])

  return {
    cal,
    currentMonthNum: localState?.month,
    nextMonth,
    previousMonth,
    popin,
    setPopin,
    currentMonth,
    isMobile,
    mobileEvents, setMobileEvents,
    isAdmin: session?.user?.profiles.find((profile: string) =>
      profile.match(/bureau|coach|com|fest/)
    ),
  }
}
