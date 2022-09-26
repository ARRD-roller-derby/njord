import { ArticleInterface } from '../../../types/article.interface'
import useArticleCard from './useArticleCard';
import ArticleCardView from './ArticleCardView';

interface Props {
  article: ArticleInterface
  reSync: ()=>void
}

export default function ArticleCard(props: Props) {
  const useProps = useArticleCard(props)
  return <ArticleCardView {...props} {...useProps} />
}
