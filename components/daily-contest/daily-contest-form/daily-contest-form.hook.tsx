import { useContext, useEffect, useState } from "react"
import usePost from "../../_hooks/usePost"
import { DailyContestContext } from "../../_pageRelated/daily-contest/daily-contest.context"
import { DailyContestFormProps, DailyContestFormResult } from "./daily-contest-form"

export const useDailyContestForm = ({ questions, closePopin }: DailyContestFormProps): DailyContestFormResult => {
  const
    [index, setIndex] = useState(0),
    [answers, setAnswers] = useState<Object>(),
    ctx = useContext(DailyContestContext),
    { data, loading, post } = usePost('quiz/daily_submit')

  const nextQuestions = () => {

    setIndex(index >= questions.length - 1 ? 0 : index + 1)
  }
  const prevQuestions = () => {
    setIndex(index <= 0 ? questions.length - 1 : index - 1)
  }

  const selectChoice = (choice: string) => {
    setAnswers(prevState => ({
      ...prevState,
      [questions[index]._id]: choice
    }))
  }

  const handleSubmit = () => {

    if (loading) return
    post({
      contestId: ctx?.data?.quiz._id,
      answers: Object.keys(answers).map((id: string) => ({ id, answer: answers[id] }))
    })

  }

  useEffect(() => {
    if (data) closePopin()
  }, [data])

  return {
    question: questions[index],
    nextQuestions,
    prevQuestions,
    total: questions.length,
    current: index + 1,
    selectChoice,
    answers,
    handleSubmit,
    loading
  }
}