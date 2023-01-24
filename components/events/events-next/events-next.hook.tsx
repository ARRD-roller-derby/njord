import { useContext, useEffect } from "react";
import { SocketContext } from "../../../stores/socket.store";
import { EventInterface } from "../../../types/Event.interface";
import { Fetch } from "../../../types/fetch.interface";
import { PaginationContext } from "../../pagination/pagination.context";
import { EventsNextContext } from "./events-next.context";
import { EventsNextResult } from "./events-next.type";

export const useEventsNext = (): EventsNextResult => {
  const ctx = useContext<Fetch<{ events: EventInterface[], totalPage: number }>>(EventsNextContext),
    [triggerRefresh] = useContext(SocketContext),
    { pagination, setTotal, setPage } = useContext(PaginationContext)

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === "event") {
      ctx.reSync({ page: pagination.currentPage });
    }
  }, [triggerRefresh]);

  useEffect(() => {
    if (!ctx.loading && pagination?.currentPage <= ctx.data?.totalPage) {
      ctx.refetch({ page: pagination.currentPage + 1 })
      setPage(1)
    }
  }, [pagination.currentPage])

  useEffect(() => {
    if (!ctx.loading && ctx?.data?.totalPage) {
      setTotal(ctx?.data.totalPage)
    }
  }, [ctx?.data])

  return {
    ...ctx,
  };
};
