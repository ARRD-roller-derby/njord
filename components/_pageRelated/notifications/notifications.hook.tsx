import { useContext, useEffect } from "react";
import { NotificationInterface } from "../../../types/notification.interface";
import { PaginationFetch } from "../../../types/pagination.interface";
import { RequestInterface } from "../../../types/Request.interface";
import { PaginationContext } from "../../pagination/pagination.context";
import useFetch from "../../_hooks/useFetch";
import { NotificationsResults } from "./notifications.types";

export const useNotifications = (): NotificationsResults => {
  const {
    data,
    loading,
    refetch,
  } = useFetch<{
    notifications: NotificationInterface[],
    requests: RequestInterface[]
  } & PaginationFetch>(
    'notifications/notifications',
    { page: 1 }
  ), { pagination, setTotal } = useContext(PaginationContext)

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
    notifications: data?.notifications,
    requests: data?.requests,
    loading: loading,
    reSync: refetch,
  }
}