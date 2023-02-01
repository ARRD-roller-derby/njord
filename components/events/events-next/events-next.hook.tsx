import { useContext } from "react";
import { TriggerEvents } from "../../../types/trigger-events.enum";
import { PaginationContext } from "../../pagination/pagination.context";
import { usePaginationSetter } from "../../pagination/pagination.hook";
import { useSocketTrigger } from "../../_hooks/socket-trigger.hook";
import { EventsNextContext } from "./events-next.context";
import { EventsNextResult } from "./events-next.type";

export const useEventsNext = (): EventsNextResult => {
  const ctx = useContext(EventsNextContext),
    { pagination } = useContext(PaginationContext)
  usePaginationSetter(ctx)
  useSocketTrigger(TriggerEvents.event, () => {
    ctx.reSync({ page: pagination.currentPage })
  });

  return {
    ...ctx,
  };
};
