import useIsMobile from '../_hooks/useIsMobile';

export default function useCalendarDay(){
  const isMobile = useIsMobile()

  return {isMobile}
}