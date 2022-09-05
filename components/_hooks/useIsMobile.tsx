import { useEffect } from 'react'
import useLocalState from './useLocalState'


export default function useIsMobile(): boolean {
  const { localState, setLocalState } = useLocalState<{ isMobile: boolean }>(
    { isMobile: true },
    'njord_device'
  )

  function handleResize() {
    setLocalState({ isMobile: window.innerWidth <= 600 ? true : false })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  return typeof window !== "undefined" ?  localState.isMobile : false
}
