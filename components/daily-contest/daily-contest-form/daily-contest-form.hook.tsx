import { useContext, useEffect, useMemo, useState } from "react"
import usePost from "../../_hooks/usePost"
import { DailyContestContext } from "../../_pageRelated/daily-contest/daily-contest.context"
import { DailyContestFormProps, DailyContestFormResult } from "./daily-contest-form"
import JSConfetti from 'js-confetti'

export const useDailyContestForm = ({ questions }: DailyContestFormProps): DailyContestFormResult => {
  const
    [index, setIndex] = useState(0),
    [answers, setAnswers] = useState<Object>({}),
    ctx = useContext(DailyContestContext),
    { data, loading, post } = usePost('quiz/daily_submit'),
    canISubmit = useMemo(() => {
      return Object.keys(answers).length === questions.length
    }, [answers, questions])
  const nextQuestions = () => {

    setIndex(index >= questions.length - 1 ? 0 : index + 1)
  }
  const prevQuestions = () => {
    setIndex(index <= 0 ? questions.length - 1 : index - 1)
  }

  const selectChoice = (choice: string, isMulti: boolean) => {
    setAnswers(prevState => {
      if (!isMulti) return {
        ...prevState,
        [questions[index]._id]: [choice]
      }

      const responses = prevState[questions[index]._id] || []
      const isExist = responses?.includes(choice)

      return {
        ...prevState,
        [questions[index]._id]: isExist ? responses.filter((item: string) => item !== choice) : [...responses, choice]
      }
    })
  }
  const handleSubmit = () => {

    if (loading) return
    post({
      contestId: ctx?.data?.quiz._id,
      answers: Object.keys(answers).map((id: string) => ({ id, answer: answers[id] }))
    })
  }

  useEffect(() => {
    if (data) {

      if (data.percent == 100) {
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti({
          emojis: ['🪅', '⚡️', '💥', '✨', '💫', '🛼', '🎖', '🏆'],
        })
      }

      ctx?.reSync()
    }
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
    loading,
    responses: data?.responses,
    percent: data?.percent,
    canISubmit
  }
}