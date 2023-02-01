import { useContext, useEffect } from 'react'
import useFetch from '../../_hooks/useFetch'
import { useSession } from 'next-auth/react'
import { ArticleInterface } from '../../../types/article.interface'
import { useProps } from './News.type'
import { PaginationContext } from '../../pagination/pagination.context'
import { PaginationFetch } from '../../../types/pagination.interface'
import { usePaginationSetter } from '../../pagination/pagination.hook'
import { useSocketTrigger } from '../../_hooks/socket-trigger.hook'

const useNews = (): useProps => {
  const ctx = useFetch<{
    articles: Array<ArticleInterface>
  } & PaginationFetch>('news/news', { page: 1 }),
    { data: session } = useSession(),
    { data, loading, refetch } = ctx,
    { pagination } = useContext(PaginationContext)

  usePaginationSetter(ctx)
  useSocketTrigger('news', () => {
    refetch({ page: pagination.currentPage })
  })

  return {
    news: data?.articles,
    loading,
    reSync: refetch,
    canPublish: session?.user?.profiles.length > 0 ? true : false,
  }
}

export default useNews
