import { QuestionInterface } from "../../../types/question.interface"

export type QuestionCardResults = {
  question: QuestionInterface,
  deleteQuestion: () => void,
  activate: () => void
}