import { EventInterface } from "../../../types/Event.interface"

export type Props = {
  event: EventInterface
  reSync: ()=>void
}

export type useProps =  {
  isMobileDevice?: boolean
  shutter: EventInterface
  setShutter: (event:EventInterface) => void
}
