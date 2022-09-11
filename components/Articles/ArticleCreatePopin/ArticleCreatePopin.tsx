import ArticleCreatePopinView from "./ArticleCreatePopinView";
import useArticleCreatePopin from "./useArticleCreatePopin";

interface Props {
  readonly close: Function
  readonly reSync: Function
}

export default function ArticleCreatePopin(props:Props){
  const useProps = useArticleCreatePopin(props)

  return <ArticleCreatePopinView {...props} {...useProps}/>
}