import classes from './News.module.css'
import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated'
import PageActions from '../../_ui/PageActions/PageActions'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel'
import { ItemWithHereInterface } from '../../../types/items.interface'
import AddArticleButton from '../../Articles/AddArticleButton/AddArticleButton'
import ArticleCard from '../../Articles/ArticleCard/ArticleCard'
import { ArticleInterface } from '../../../types/article.interface'

interface props {
  readonly news: Array<ArticleInterface>
  readonly loading: boolean
  readonly reSync: Function
  readonly canPublish: boolean
}

export default function NewsView({ news, loading, reSync, canPublish }: props) {

  return (
    <AuthentificatedLayout>
      <PageActions>
        {canPublish && <AddArticleButton reSync={reSync} />}
      </PageActions>
      <div className={classes.container}>
        {loading && <LoaderWheel />}
        <div className={classes.items}>
          {news && news.length === 0 && <div>Aucune news.</div>}
          {!loading &&
            news &&
            news.map((article) => (
              <ArticleCard
                key={article._id}
                article={article}
                reSync={reSync}
              />
            ))}
        </div>
      </div>
    </AuthentificatedLayout>
  )
}
