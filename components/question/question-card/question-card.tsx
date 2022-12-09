import { useState } from "react"
import { QuestionInterface } from "../../../types/question.interface"
import Factory from "../../_layouts/Factory/Factory"
import { QuestionContext } from "../question.context"
import { useQuestionCard } from "./question-card.hook"
import { QuestionCardView } from "./question-card.view"
import { QuestionCardResults } from "./question.type"


const QuestionCardFactory = Factory<unknown, QuestionCardResults>(
  useQuestionCard,
  QuestionCardView
)

export const QuestionCard = ({ question }: { question: QuestionInterface }) => {
  const state = useState(question)

  return (
    <QuestionContext.Provider value={state}>
      <QuestionCardFactory />
    </QuestionContext.Provider>
  )
}