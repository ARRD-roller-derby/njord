import useIsMobileDevice from "../../_hooks/useIsMobileDevice"

export default function useEventCard(){
  const isMobileDevice = useIsMobileDevice()
  return {isMobileDevice}
}