import Factory from "../../_layouts/Factory/Factory"
import { Props, useProps } from "./AddArticleButton.type"
import AddArticleButtonView from "./AddArticleButtonView"
import useAddArticleButton from "./useAddArticleButton"

const AddArticleButton = Factory<Props,useProps>(useAddArticleButton,AddArticleButtonView)

export default AddArticleButton