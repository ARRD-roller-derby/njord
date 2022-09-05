import { ItemInterface } from '../../../types/items.interface'
import ItemPopinView from './ItemPopinView'
import useItemPopin from './useItemPopin';


interface Props {
  readonly item: ItemInterface
  readonly reSync: Function
  readonly setClose: Function
}

export default function ItemPopin(props: Props) {
  const useProps = useItemPopin(props.item)
  return <ItemPopinView {...props} {...useProps} />
}
