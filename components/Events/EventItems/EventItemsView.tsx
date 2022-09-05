import { ItemWithHereInterface } from '../../../types/items.interface'
import ItemPopin from '../../Item/ItemPopin/ItemPopin'
import ItemCard from '../../_ui/ItemCard/ItemCard'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel'
import classes from './EventItems.module.css'

interface Props {
  readonly items: Array<ItemWithHereInterface>
  readonly itemForPopin: ItemWithHereInterface
  readonly loading: boolean
  readonly reSync: Function
  readonly closePopin: Function
  readonly openPopin: Function
}

export default function EventItemsView({
  items,
  loading,
  openPopin,
  itemForPopin,
  closePopin,
  reSync,
}: Props) {
  return (
    <div className={classes.container}>
      {loading && (
        <div className={classes.loader}>
          <LoaderWheel />
        </div>
      )}
      <ItemPopin item={itemForPopin} setClose={closePopin} reSync={reSync} />
      <div className={classes.box}>
        <div className={classes.items}>
          {!loading &&
            items &&
            items.map((item) => (
              <ItemCard
                openPopin={openPopin}
                key={item.name}
                item={item}
                isHereIndicator
              />
            ))}
        </div>
      </div>
    </div>
  )
}
