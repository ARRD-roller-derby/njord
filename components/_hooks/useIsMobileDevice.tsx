import { useState, useEffect } from 'react'

export default function useIsMobileDevice():boolean {
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  function handleResize() {
    if(navigator){
      setIsMobileDevice(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }
  }

  useEffect(() => {
    handleResize()
  }, [])

  return isMobileDevice
}
