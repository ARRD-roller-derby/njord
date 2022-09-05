import MenuDesktop from "../MenuDesktop/MenuDesktop"
import MenuMobile from "../MenuMobile/MenuMobile"

interface Props {
  readonly isMobile:boolean
}

export default function MenuView({isMobile}:Props){
  return isMobile ? <MenuMobile/> : <MenuDesktop/>
}