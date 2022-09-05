import useIsMobile from "../_hooks/useIsMobile";

export default function useMenu(){
  const isMobile = useIsMobile()

  return {isMobile}
}