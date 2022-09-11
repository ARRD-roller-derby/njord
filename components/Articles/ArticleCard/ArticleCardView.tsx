import { ArticleInterface } from '../../../types/article.interface'
import ReactMarkdown from 'react-markdown'
import classes from './ArticleCard.module.css'
import validator from 'validator'
import dayjs from 'dayjs'
import NewsDeleteButton from '../NewsDeleteButton/NewsDeleteButton'

interface Props {
  readonly article: ArticleInterface
  readonly reSync: Function
  readonly canIDeleteThis: boolean
}

export default function ArticleCardView({
  reSync,
  article,
  canIDeleteThis,
}: Props) {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <div className={classes.author}>{article.profile}</div>
        <div className={classes.date}>
          {dayjs(article.updatedAt).from(dayjs())}
        </div>
      </div>
      <div className={classes.content}>
        <ReactMarkdown>{validator.unescape(article.content)}</ReactMarkdown>
      </div>

      {canIDeleteThis && (
        <div className={classes.button}>
          <NewsDeleteButton article={article} reSync={reSync} />
        </div>
      )}
    </div>
  )
}
