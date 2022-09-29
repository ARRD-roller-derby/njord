import classes from './Stuff.module.css'
import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated'
import PageActions from '../../_ui/PageActions/PageActions'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel'
import { ItemInterface, ItemWithHereInterface } from '../../../types/items.interface'
import AddItemButton from '../../Item/AddItemButton/AddItemButton'
import ItemCard from '../../_ui/ItemCard/ItemCard'
import ItemPopin from '../../Item/ItemPopin/ItemPopin'

interface props {
  readonly items: Array<ItemWithHereInterface>
  readonly itemForPopin: ItemInterface
  readonly loading: boolean
  readonly reSync: ()=>void
  readonly closePopin: ()=>void
  readonly openPopin: Function
}

export default function StuffView({
  items,
  loading,
  reSync,
  itemForPopin,
  closePopin,
  openPopin,
}: props) {
  return (
    <AuthentificatedLayout>
      <ItemPopin item={itemForPopin} setClose={closePopin} reSync={reSync}/>
      <PageActions>
        <AddItemButton reSync={reSync}/>
      </PageActions>
      <div className={classes.container}>
        {loading && <LoaderWheel />}
        <div className={classes.items}>
          {items && items.length === 0 && <div>Aucun objet.</div>}
          {(!loading && items) && items.map((item)=><ItemCard  openPopin={openPopin} key={item.name} item={item}/>)}
        </div>
      </div>
    </AuthentificatedLayout>
  )
}
