import { useSession } from "next-auth/react";
import { useContext, useMemo } from "react";
import { TriggerEvents } from "../../../types/trigger-events.enum";
import { useSocketTrigger } from "../../_hooks/socket-trigger.hook";
import { RankingGeneralFactoryResult } from "./ranking-general";
import { RankingGeneralContext } from "./ranking-general.context";

export const useRankingGeneral = (): RankingGeneralFactoryResult => {
  const { data: session } = useSession()
  const { data, loading, reSync } = useContext(RankingGeneralContext);
  const podium: number[] = useMemo(() => {
    if (!data?.ranking) return []
    const ranks: number[] = data.ranking.reduce((acc: string[], curr) => {
      const type = curr.dailyContestAvgAccuracy ? 'dailyContestAvgAccuracy' : 'dailyContestAvgTime'
      const isExist = acc.find((pos) => pos === curr?.[type])
      if (!isExist) acc.push(curr?.[type])
      return acc
    }, [])

    return ranks.sort((a, b) => b - a)
  }, [data?.ranking])
  useSocketTrigger(TriggerEvents.daily_contest, reSync)
  return { ranking: data?.ranking, loading, myId: session?.user._id, podium };
}