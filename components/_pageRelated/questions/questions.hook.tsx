import { useContext, useEffect } from "react"
import { SocketContext } from "../../../stores/socket.store"
import { PaginationContext } from "../../pagination/pagination.context"
import { QuestionsContext } from "./question.context"
import { QuestionsResults } from "./questions.type"

export const useQuestions = (): QuestionsResults => {
  const { data, loading, refetch } = useContext(QuestionsContext),
    { pagination, setTotal } = useContext(PaginationContext),
    [triggerRefresh] = useContext(SocketContext);

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === 'questions') {
      refetch()
    }
  }, [triggerRefresh])
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
    loading,
    questions: data?.questions
  }
}