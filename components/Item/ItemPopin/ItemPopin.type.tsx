import { ItemInterface } from "../../../types/items.interface"
import { UserInterface } from "../../../types/User.interface"

export type  Props = {
  item: ItemInterface
  reSync: () => void
  setClose: () => void
}

export type  useProps = {
  item: ItemInterface
  user: UserInterface
  uri: string
  isMyItem:boolean
}