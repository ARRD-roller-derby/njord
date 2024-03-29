import { useSession } from "next-auth/react";
import { useContext, useMemo } from "react";
import { TriggerEvents } from "../../../types/trigger-events.enum";
import { useSocketTrigger } from "../../_hooks/socket-trigger.hook";
import { RankingGeneralFactoryResult } from "./ranking-general";
import { RankingGeneralContext } from "./ranking-general.context";

export const useRankingGeneral = ({ type }: { type: 'speed' | 'percent' }): RankingGeneralFactoryResult => {
  const { data: session } = useSession()
  const { data, loading, reSync } = useContext(RankingGeneralContext);
  const podium: number[] = useMemo(() => {
    if (!data?.ranking) return []
    const ranks: number[] = data.ranking.reduce((acc: string[], curr) => {
      const key = type === "percent" ? 'dailyContestAvgAccuracy' : 'dailyContestAvgTime'
      const isExist = acc.find((pos) => pos === curr?.[key])
      if (!isExist) acc.push(curr?.[key])
      return acc
    }, [])

    return ranks.sort((a, b) => type === 'percent' ? b - a : a - b)
  }, [data?.ranking])
  useSocketTrigger(TriggerEvents.daily_contest, reSync)
  return { ranking: data?.ranking, loading, myId: session?.user._id, podium, faster: data?.faster, slower: data?.slower };
}