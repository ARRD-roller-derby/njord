import { ArticleInterface } from '../../../types/article.interface'
import ReactMarkdown from 'react-markdown'
import classes from './ArticleCard.module.css'
import validator from 'validator'
import dayjs from 'dayjs'
import NewsDeleteButton from '../NewsDeleteButton/NewsDeleteButton'
import useArticleCard from './useArticleCard';
import ArticleCardView from './ArticleCardView';

interface Props {
  readonly article: ArticleInterface
  readonly reSync: Function
}

export default function ArticleCard(props: Props) {
  const useProps = useArticleCard(props)
  return <ArticleCardView {...props} {...useProps} />
}
