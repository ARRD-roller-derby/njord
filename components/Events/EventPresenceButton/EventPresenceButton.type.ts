import { EventInterface } from "../../../types/Event.interface"

export type Props = {
  event:EventInterface
  setEvent:(event:EventInterface)=> void
}

export type useProps = {
  handleSubmit: ()=>void
  loading: boolean,
  presence: boolean
}