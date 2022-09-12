import Factory from "../../_layouts/Factory/Factory"
import AddArticleButtonView from "./AddArticleButtonView"
import useAddArticleButton from "./useAddArticleButton"

interface Props {
  readonly reSync:Function
}

const AddArticleButton = Factory<Props>(useAddArticleButton,AddArticleButtonView)
export default AddArticleButton