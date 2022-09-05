import { ItemInterface } from "../../../types/items.interface";
import ItemDeleteButtonView from "./ItemDeleteButtonView";
import useItemDeleteButton from "./useItemDeleteButton";

interface Props {
  readonly item: ItemInterface
  readonly reSync: Function
  readonly setClose: Function
}
export default function ItemDeleteButton(props:Props){
  const useProps = useItemDeleteButton(props)
  return <ItemDeleteButtonView {...useProps}/>
}