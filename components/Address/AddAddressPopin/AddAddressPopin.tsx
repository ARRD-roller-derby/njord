import AddAddressPopinView from './AddAddressPopinView';
import useAddAddressPopin from './useAddAddressPopin';


interface Props {
  readonly reSync:Function
  readonly closePopin: Function
}
export default function AddAddressPopin({closePopin,reSync}:Props){
  const useProps = useAddAddressPopin(reSync,closePopin)

  return <AddAddressPopinView {...useProps} closePopin={closePopin}/>
}