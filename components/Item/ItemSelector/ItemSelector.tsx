import ItemSelectorView from "./ItemSelectorView";
import useItemSelector from "./useItemSelector";
interface Props {
  readonly setValue:Function
}

export default function ItemSelector({setValue}:Props){
  const useProps = useItemSelector(setValue)
  return <ItemSelectorView {...useProps}/>
}