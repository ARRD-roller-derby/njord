import classes from './Stuff.module.css'
import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated'
import PageActions from '../../_ui/PageActions/PageActions'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel'
import { ItemInterface } from '../../../types/items.interface'
import AddItemButton from '../../Item/AddItemButton/AddItemButton'

interface props {
  readonly items: Array<ItemInterface>
  readonly itemForPopin: ItemInterface
  readonly loading: boolean
  readonly reSync: Function
  readonly closePopin: Function
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
      <PageActions>
        <AddItemButton reSync={reSync}/>
      </PageActions>
      <div className={classes.container}>
        {loading && <LoaderWheel />}
        <div className={classes.addresses}>
          {items && items.length === 0 && <div>Aucun objet.</div>}
        </div>
      </div>
    </AuthentificatedLayout>
  )
}
