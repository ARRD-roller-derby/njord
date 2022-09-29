import Factory from '../../_layouts/Factory/Factory'
import useItemThumbChangePopin from './ItemThumbChangePopin.hook'
import { Props, useProps } from './ItemThumbChangePopin.type'
import ItemThumbChangePopinView from './ItemThumbChangePopin.view'

const ItemThumbChangePopin = Factory<Props, useProps>(
  useItemThumbChangePopin,
  ItemThumbChangePopinView
)

export default ItemThumbChangePopin
