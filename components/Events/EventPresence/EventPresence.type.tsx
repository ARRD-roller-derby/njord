import { EventInterface } from "../../../types/Event.interface"

export type useProps = {
  event : EventInterface,
  setEvent: (event:EventInterface)=> void
}