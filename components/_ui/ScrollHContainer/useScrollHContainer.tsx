import { useEffect } from "react"
import useIsMobileDevice from "../../_hooks/useIsMobileDevice"

interface Props {
  readonly id: string
}

export default function useScrollHContainer({id}:Props){
  const isMobileDevice = useIsMobileDevice()

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

  return {isMobileDevice}
}