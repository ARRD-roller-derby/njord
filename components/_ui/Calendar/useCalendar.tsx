import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import useIsMobile from '../../_hooks/useIsMobile'
import useLocalState from '../../_hooks/useLocalState'
import { CalDayInterface } from '../../../types/CalDay.interface'
import { useSession } from 'next-auth/react';

export default function useCalendar() {
  const 
    {data:session}= useSession(),
    { localState, setLocalState } = useLocalState<{
      year: number
      month: any
    }>(
      {
        year: 0,
        month: dayjs(dayjs().month()),
      },
      'njord_yearMonth'
    ),
    [cal, setCal] = useState<
      Array<CalDayInterface>
    >([]),
    [currentMonth, setCurrentMonth] = useState<string>(''),
    isMobile = useIsMobile()

  function createCalendar() {
    const 
      thisMonth = dayjs().month(localState.month),
      firstDay = dayjs(thisMonth).add(localState.year, 'year').startOf('month'),
      lastDay = dayjs(thisMonth).add(localState.year, 'year').endOf('month'),
      firstCalDay = firstDay.subtract(
        firstDay.day() === 0 ? 0 : firstDay.day() - 1,
        'day'
      ),
      lastCalDay = lastDay.add(
        lastDay.day() === 0 ? 0 : 7- lastDay.day(),
        'day'
      ),
      numOfDay = lastCalDay.diff(firstCalDay, 'day'),
      generateCal = []


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
        .add(localState.year, 'year')
        .format('MMMM YYYY')
    )
    //sometimes, one day add
    setCal(generateCal.slice(0,35))
  }

  function nextMonth() {
    const next = localState.month + 1
    if (next > 11) {
      setLocalState({
        month: 0,
        year: localState.year + 1,
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
        month: 11,
        year: localState.year - 1,
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

  return {
    cal,
    currentMonthNum: localState?.month,
    nextMonth,
    previousMonth,
    currentMonth,
    isMobile,
    isAdmin:session?.user?.profiles.find((profile:string)=> profile.match(/bureau|coach|com|fest/))
  }
}
