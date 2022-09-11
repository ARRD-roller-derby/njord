import { ArticleInterface } from "../../../types/article.interface"
import NewsDeleteButtonView from "./NewsDeleteButtonView"
import useNewsDeleteButton from "./useNewsDeleteButton"

interface Props {
  readonly article: ArticleInterface
  readonly reSync: Function 
}

export default function NewsDeleteButton(props:Props){
  const useProps = useNewsDeleteButton(props)

  return <NewsDeleteButtonView {...useProps}/>
}