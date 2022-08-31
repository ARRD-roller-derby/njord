import { useContext, useEffect, useRef, useMemo, useState } from 'react'
import { PusherContext } from '../../../stores/pusher.store'
import { EventInterface } from '../../../types/Event.interface'
import { EventType } from '../../../types/EventType.enum'
import useSilentDBSync from '../../_hooks/useSilentDBSync'
import useIsMobileDevice from '../../_hooks/useIsMobileDevice'
import eventTitleRender from '../../../utils/eventTitleRender'

export default function useEventsNext(id: string) {
  const {
      data: events,
      loading,
      reSync,
    } = useSilentDBSync<Array<EventInterface>>('events/next', 'events'),
    [triggerRefresh] = useContext(PusherContext),
    isMobileDevice = useIsMobileDevice(),
    selectByType = useMemo(() => {
      return events?.reduce((acc, event) => {
        const isExist = acc.find(
          (select: { label: string; value: string }) =>
            select.value === event.type
        )
        if (!isExist) {
          acc.push({
            label: `${eventTitleRender(event)} (1)`,
            count: 1,
            value: event.type,
          })
        } else {
          const newSelect = { ...isExist },
            index = acc.findIndex(
              (select: { label: string; value: string }) =>
                select.value === event.type
            )
          newSelect.count = isExist.count + 1
          newSelect.label = `${eventTitleRender(event)} (${newSelect.count})`
          acc.splice(index, 1, newSelect)
        }
        return acc
      }, [])
    }, [events]),
    [currentType, setCurrentType] = useState<{ label: string; value: string }>()

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === 'event') {
      reSync()
    }
  }, [triggerRefresh])

  useEffect(() => {
    if (selectByType) {
      setCurrentType(
        selectByType.find((select) => select.value === 'training') ||
          selectByType.at(0)
      )
    }
  }, [selectByType])

  function alignScroll() {
    const container: HTMLElement = document.getElementById(id)
    container.style.overflowX = 'hidden'
    container.setAttribute('data-stop', 'true')
    const theOne = Array.from(container.children).find((child: HTMLElement) => {
      const isTheOne =
        (child.getBoundingClientRect().right > window.innerWidth / 2 &&
          child.getBoundingClientRect().left < 20) ||
        (child.getBoundingClientRect().left < window.innerWidth / 2 &&
          child.getBoundingClientRect().right > window.innerWidth)
      return isTheOne
    })

    if (theOne) {
      container.scrollTo({
        left: theOne.getBoundingClientRect().left - 15 + container.scrollLeft,
        behavior: 'smooth',
      })
    }
    container.style.overflowX = 'auto'
    container.setAttribute('data-stop', 'false')
  }

  useEffect(() => {
    const container: HTMLElement = document.getElementById(id)
    if (container && isMobileDevice && typeof window !== 'undefined') {
      container.addEventListener('touchend', (e) => {
        if (container.getAttribute('data-stop') !== 'true') {
          setTimeout(alignScroll, 400)
        }
        if (container.getAttribute('data-stop') !== 'true') {
          setTimeout(alignScroll, 1000)
        }
      })
    }
  }, [isMobileDevice])

  return {
    id,
    isMobileDevice,
    events: events?.filter(
      (event) => event.type === currentType?.value || EventType.training
    ),
    loading,
    training: events?.filter((event) => event.type === EventType.training),
    currentType,
    setCurrentType,
    reSync,
    selectByType,
  }
}
