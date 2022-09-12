import { useState } from 'react'
import useFetch from '../../_hooks/useFetch'
import { useSession } from 'next-auth/react'
import { ArticleInterface } from '../../../types/article.interface'

export default function useNews() {
  const { data, loading, refetch } = useFetch<{
      page: number
      totalPage: number
      articles: Array<ArticleInterface>
    }>('news/news'),
    { data: session } = useSession(),
    [currentPage, setCurrentPage] = useState<number>(1)

  function setPagination() {
    if (!loading && data?.totalPage > data?.page) {
      refetch({ page: data?.page ? data.page + 1 : 0 })
    }
  }
  return {
    news: data?.articles,
    loading,
    reSync: refetch,
    currentPage,
    setPagination,
    canPublish: session?.user?.profiles.length > 0 ? true : false,
  }
}
