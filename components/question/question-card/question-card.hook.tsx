import { useContext, useEffect } from "react"
import usePost from "../../_hooks/usePost"
import { QuestionContext } from "../question.context"
import { QuestionCardResults } from "./question.type"
import { QuestionsContext } from "../../_pageRelated/questions/question.context"

export const useQuestionCard = (): QuestionCardResults => {
  const
    { refetch } = useContext(QuestionsContext),
    [question, setQuestion] = useContext(QuestionContext),
    { data: activateData, loading: loadingActivate, post: activate } = usePost('question/activate'),
    { data: deleteData, loading: loadingDel, post: deleteQuestion } = usePost('question/delete')

  useEffect(() => {
    if (deleteData) refetch()
  }, [deleteData])

  useEffect(() => {
    if (activateData) setQuestion(activateData)
  }, [activateData])

  return {
    question,
    activate: () => {
      if (loadingActivate || loadingDel) return
      activate({ id: question._id })
    },
    deleteQuestion: () => {
      if (loadingActivate || loadingDel) return
      deleteQuestion({ id: question._id })
    }
  }
}