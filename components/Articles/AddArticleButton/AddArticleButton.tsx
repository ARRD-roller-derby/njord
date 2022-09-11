import AddArticleButtonView from "./AddArticleButtonView"
import useAddArticleButton from "./useAddArticleButton"

interface Props {
  readonly reSync:Function
}

export default function AddArticleButton(props:Props){
  const useProps = useAddArticleButton()

  return <AddArticleButtonView {...props} {...useProps}/>
}