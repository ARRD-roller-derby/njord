import { useContext, useEffect, useState } from "react";
import usePost from "../../_hooks/usePost";
import { DailyContestContext } from "../../_pageRelated/daily-contest/daily-contest.context";
import { DailyContestButtonResult } from "./daily-contest-button";

export const useDailyContestButton = (): DailyContestButtonResult => {
  const
    { loading: contestLoading, data: contestData, reSync } = useContext(DailyContestContext),
    { data, loading, post } = usePost('quiz/daily_participate'),
    [isOpenPopin, setIsOpenPopin] = useState<boolean>(false)

  const openPopin = () => {
    if (contestData?.quiz._id) {
      post({ contestId: contestData?.quiz._id })
    }
  }
  useEffect(() => {
    if (data) setIsOpenPopin(true)
  }, [data])

  return {
    loading: loading || contestLoading,
    openPopin,
    closePopin: () => setIsOpenPopin(false),
    isOpenPopin,
    questions: data?.questions
  }
}