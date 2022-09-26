import { EventInterface } from "../../../types/Event.interface"

export type Props = {
  event:EventInterface
  setEvent:(event:EventInterface)=> void
}

type option = {
  label: string
  value: string
}

export type useProps = {
  options: option[]
  loading: boolean
  onChange: (option:option)=>void
}