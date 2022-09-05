
import { ItemInterface } from '../../../types/items.interface';
import ItemDepositButtonView from './ItemDepositButtonView';
import useItemDepositButton from './useItemDepositButton';

interface Props {
  readonly item: ItemInterface
  readonly reSync: Function
  readonly setClose:Function
}

export default function ItemDepositButton(props:Props){
  const useProps = useItemDepositButton(props)

  return <ItemDepositButtonView {...useProps}/>
}