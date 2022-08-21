import { useState, useEffect } from 'react'

export default function useIsMobile():boolean {
  const [isMobile, setIsMobile] = useState(false)
  function handleResize() {
    setIsMobile(window.innerWidth <= 600 ? true : false)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  }, [])

  return isMobile
}
