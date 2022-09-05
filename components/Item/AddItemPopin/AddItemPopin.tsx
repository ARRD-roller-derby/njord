import AddItemPopinView from './AddItemPopinView';
import useAddItemPopin from './useAddItemPopin';


interface Props {
  readonly reSync:Function
  readonly closePopin: Function
}
export default function AddItemPopin({closePopin,reSync}:Props){
  const useProps = useAddItemPopin(reSync,closePopin)

  return <AddItemPopinView {...useProps} closePopin={closePopin}/>
}