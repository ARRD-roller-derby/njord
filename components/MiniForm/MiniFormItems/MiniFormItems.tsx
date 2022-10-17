import Factory from "../../_layouts/Factory/Factory"
import { Props, useProps } from "./MiniFormItems.type"
import { useMiniFormItems } from './MiniFormItems.hook'
import { MiniFormItemsView } from "./MiniFormItems.view"

const MiniFormItems = Factory<Props,useProps>(useMiniFormItems,MiniFormItemsView)
export default MiniFormItems
