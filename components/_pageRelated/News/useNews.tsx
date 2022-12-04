import { useContext, useEffect, useState } from 'react'
import useFetch from '../../_hooks/useFetch'
import { useSession } from 'next-auth/react'
import { ArticleInterface } from '../../../types/article.interface'
import { useProps } from './News.type'
import { SocketContext } from '../../../stores/socket.store'
import { PaginationContext } from '../../pagination/pagination.context'
import { PaginationFetch } from '../../../types/pagination.interface'

const useNews = (): useProps => {
  const { data, loading, refetch } = useFetch<{
    articles: Array<ArticleInterface>
  } & PaginationFetch>('news/news', { page: 1 }),
    [triggerRefresh] = useContext(SocketContext),
    { data: session } = useSession(),
    { pagination, setTotal } = useContext(PaginationContext)

  function setPagination() {
    if (!loading && data?.totalPage > data?.page) {
      refetch({ page: pagination.currentPage })
    }
  }

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === 'news') {
      refetch({ page: pagination.currentPage })
    }
  }, [triggerRefresh])

  useEffect(() => {
    if (!loading && pagination?.currentPage <= data?.totalPage) {
      refetch({ page: pagination.currentPage })
    }
  }, [pagination.currentPage])

  useEffect(() => {
    if (!loading && data?.totalPage) {
      setTotal(data.totalPage)
    }
  }, [data])


  return {
    news: data?.articles,
    loading,
    reSync: refetch,
    currentPage: pagination.currentPage,
    totalPage: data?.totalPage,
    setPagination,
    canPublish: session?.user?.profiles.length > 0 ? true : false,
  }
}

export default useNews
