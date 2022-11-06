import { useContext, useEffect } from "react";
import { SocketContext } from "../../../stores/socket.store";
import { EventsNextContext } from "./events-next.context";
import { EventsNextResult } from "./events-next.type";

export const useEventsNext = (): EventsNextResult => {
  const ctx = useContext(EventsNextContext),
    [triggerRefresh] = useContext(SocketContext);

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === "event") {
      ctx.reSync();
    }
  }, [triggerRefresh]);

  console.log(ctx);
  return {
    ...ctx,
  };
};
