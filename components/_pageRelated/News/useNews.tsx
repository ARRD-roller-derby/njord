import { useContext, useEffect, useState } from 'react'
import useFetch from '../../_hooks/useFetch'
import { useSession } from 'next-auth/react'
import { ArticleInterface } from '../../../types/article.interface'
import { useProps } from './News.type'
import { PusherContext } from '../../../stores/pusher.store'

const useNews = ():useProps => {
  const { data, loading, refetch } = useFetch<{
      page: number
      totalPage: number
      articles: Array<ArticleInterface>
    }>('news/news'),
    [triggerRefresh] = useContext(PusherContext),
    { data: session } = useSession(),
    [currentPage, _setCurrentPage] = useState<number>(1)

  function setPagination() {
    if (!loading && data?.totalPage > data?.page) {
      refetch({ page: data?.page ? data.page + 1 : 0 })
    }
  }

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === 'news') {
      refetch()
    }
  }, [triggerRefresh])

  return {
    news: data?.articles,
    loading,
    reSync: refetch,
    currentPage,
    setPagination,
    canPublish: session?.user?.profiles.length > 0 ? true : false,
  }
}

export default useNews
