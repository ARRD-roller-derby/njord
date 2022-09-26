import classes from './News.module.css'
import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated'
import PageActions from '../../_ui/PageActions/PageActions'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel'
import AddArticleButton from '../../Articles/AddArticleButton/AddArticleButton'
import ArticleCard from '../../Articles/ArticleCard/ArticleCard'
import { useProps } from './News.type'

const NewsView = ({ news, loading, reSync, canPublish }: useProps) => {
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

export default NewsView
