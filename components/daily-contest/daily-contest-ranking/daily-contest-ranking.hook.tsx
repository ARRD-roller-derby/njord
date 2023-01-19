import { useSession } from "next-auth/react"
import { useContext, useEffect } from "react"
import { SocketContext } from "../../../stores/socket.store"
import { PaginationFetch } from "../../../types/pagination.interface"
import { RankingUserInterface } from "../../../types/ranking-quiz.interface"
import { TriggerEvents } from "../../../types/trigger-events.enum"
import { PaginationContext } from "../../pagination/pagination.context"
import useFetch from "../../_hooks/useFetch"
import { DailyContestRankingFactoryResult } from "./daily-contest-ranking"

export const useDailyContestRanking = ({ date }): DailyContestRankingFactoryResult => {
  const { data, loading, reSync } = useFetch<{
    ranking: Array<RankingUserInterface>,
    faster: number,
    slower: number
  } & PaginationFetch>('quiz/daily_ranking', { page: 1, date }),
    [triggerRefresh] = useContext(SocketContext),
    { pagination, setTotal } = useContext(PaginationContext),
    { data: session } = useSession()

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === TriggerEvents.daily_contest) {
      reSync({ page: pagination.currentPage, date })
    }
  }, [triggerRefresh])

  useEffect(() => {
    if (!loading && pagination?.currentPage <= data?.totalPage) {
      reSync({ page: pagination.currentPage, date })
    }
  }, [pagination.currentPage])

  useEffect(() => {
    if (!loading && data?.totalPage) {
      setTotal(data.totalPage)
    }
  }, [data])

  return {
    ranking: data?.ranking,
    faster: data?.faster,
    slower: data?.slower,
    myId: session?.user._id ?? '',
    loading,
    reSync,
  }
}