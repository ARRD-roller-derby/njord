import { useContext, useEffect, useRef } from 'react'
import { PusherContext } from '../../../stores/pusher.store'
import { EventInterface } from '../../../types/Event.interface'
import { EventType } from '../../../types/EventType.enum'
import useSilentDBSync from '../../_hooks/useSilentDBSync'
import useIsMobileDevice from '../../_hooks/useIsMobileDevice'

export default function useEventsNext(id:string) {
  const {
      data: events,
      loading,
      reSync,
    } = useSilentDBSync<Array<EventInterface>>('events/next', 'events'),
    [triggerRefresh] = useContext(PusherContext),
    isMobileDevice = useIsMobileDevice()

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === 'event') {
      reSync()
    }
  }, [triggerRefresh])

  function alignScroll(){
    console.log('OK')
    const container: HTMLElement = document.getElementById(id)
    container.style.overflowX = 'hidden'
    container.setAttribute('data-stop','true');
    const theOne = Array.from(container.children).find(
      (child: HTMLElement) => {
        const isTheOne =
          (child.getBoundingClientRect().right > window.innerWidth / 2 &&
          child.getBoundingClientRect().left < 20 ) ||
          (child.getBoundingClientRect().left < window.innerWidth / 2 &&
          child.getBoundingClientRect().right > window.innerWidth)
        return isTheOne
      }
    )

    if (theOne) {
      container.scrollTo({
        left:
          theOne.getBoundingClientRect().left - 15 + container.scrollLeft,
        behavior: 'smooth',
      })
    }
    container.style.overflowX = 'auto'
    container.setAttribute('data-stop','false');
  }

  useEffect(() => {
    const container: HTMLElement = document.getElementById(id)
    if (container && isMobileDevice && typeof window !== 'undefined') {

      container.addEventListener('touchend', (e) => {
        if(container.getAttribute('data-stop')!=='true'){
          setTimeout(alignScroll,400)
        }
        if(container.getAttribute('data-stop')!=='true'){
          setTimeout(alignScroll,1000)
        }
        
    })
  }
  }, [isMobileDevice])

  return {
    id,
    isMobileDevice,
    events: events?.filter((event) => event.type !== EventType.training),
    loading,
    training: events?.filter((event) => event.type === EventType.training),
  }
}
