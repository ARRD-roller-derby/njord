import { EventInterface } from "../../../types/Event.interface"

export type  Props = {
  event:EventInterface
  reSync: ()=>void
}

export type useProps = {
  options: any
  loading: boolean
}
