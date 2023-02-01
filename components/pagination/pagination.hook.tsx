import { useContext, useEffect } from "react"
import { PaginationFetch } from "../../types/pagination.interface"
import { PaginationContext } from "./pagination.context"

interface PaginationSetter {
  loading: boolean
  data: PaginationFetch
  refetch: (body?: Object) => void
}

export const usePagination = () => {
  const ctx = useContext(PaginationContext)

  return ctx
}

export const usePaginationSetter = ({
  loading,
  data,
  refetch,
}: PaginationSetter): {} => {
  const { pagination, setTotal } = useContext(PaginationContext)

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

  return {}
}
