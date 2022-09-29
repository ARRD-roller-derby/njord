import Factory from "../../_layouts/Factory/Factory"
import useItemThumbButton from "./ItemThumbButton.hook"
import { useProps } from "./ItemThumbButton.type"
import ItemThumbButtonView from "./ItemThumbButton.view"

const ItemThumbButton = Factory<unknown,useProps>(useItemThumbButton,ItemThumbButtonView)

export default ItemThumbButton