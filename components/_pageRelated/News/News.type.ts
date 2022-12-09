import { ArticleInterface } from "../../../types/article.interface"

export type useProps = {
  news: ArticleInterface[]
  loading: boolean
  reSync: (body?: Object) => void
  canPublish: boolean
}