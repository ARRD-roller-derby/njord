import { ArticleInterface } from "../../../types/article.interface"

export type  useProps = {
  news: ArticleInterface[]
  loading: boolean
  currentPage: number
  totalPage: number
  setPagination: (page:number)=>void
  reSync: (body?:Object)=>void
  canPublish: boolean
}