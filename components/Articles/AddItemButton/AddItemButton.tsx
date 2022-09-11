import AddItemButtonView from "./AddItemButtonView";
import useAddItemButton from "./useAddItemButton";

interface Props {
  readonly reSync:Function
}

export default function AddItemButton(props:Props){
  const useProps = useAddItemButton()

  return <AddItemButtonView {...props} {...useProps}/>
}