import { useContext, useEffect } from "react"
import { SocketContext } from "../../../stores/socket.store";
import { TriggerEvents } from "../../../types/trigger-events.enum";
import { DailyContestContext } from "./daily-contest.context"

export const useDailyContest = () => {
  const { data, reSync } = useContext(DailyContestContext),
    [triggerRefresh] = useContext(SocketContext)

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === TriggerEvents.daily_contest) {
      reSync();
    }
  }, [triggerRefresh]);


  return { quiz: data?.quiz, cantPlay: data?.cantPlay }
} 