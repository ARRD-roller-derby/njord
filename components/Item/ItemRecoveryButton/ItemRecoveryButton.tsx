import ItemRecoveryButtonView from "./ItemRecoveryButtonView";
import useItemRecoveryButton from './useItemRecoveryButton';
import { ItemInterface } from '../../../types/items.interface';

interface Props {
  readonly item: ItemInterface
  readonly reSync: Function
  readonly setClose:Function
}

export default function ItemRecoveryButton(props:Props){

  const useProps = useItemRecoveryButton(props)

  return <ItemRecoveryButtonView {...useProps}/>
}