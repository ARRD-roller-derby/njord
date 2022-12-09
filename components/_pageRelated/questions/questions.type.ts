import { QuestionInterface } from "../../../types/question.interface"

export type QuestionsResults = {
    questions?: QuestionInterface[],
    loading: boolean
}