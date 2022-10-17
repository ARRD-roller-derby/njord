import ItemSelectorView from "./ItemSelectorView";
import useItemSelector from "./useItemSelector";
interface Props {
  setValue:Function
  defaultValues?: Array<{label:string,value:string}>
}

export default function ItemSelector({setValue,defaultValues}:Props){
  const useProps = useItemSelector(setValue,defaultValues)
  return <ItemSelectorView {...useProps}/>
}
