import Factory from "../../_layouts/Factory/Factory";
import { useDailyContestForm } from "./daily-contest-form.hook";
import { DailyContestFormView } from "./daily-contest-form.view";

export type Question = {
  _id: string,
  question: string,
  choices: string[],
  percent: number,
  img?: string
}

export interface DailyContestFormProps {
  questions: Question[],
  closePopin: () => void
}

export interface DailyContestFormResult {
  question: Question
  nextQuestions: () => void
  prevQuestions: () => void
  selectChoice: (choice: string) => void
  handleSubmit: () => void
  total: number
  current: number
  answers: Object,
  loading: boolean
  responses?: string[]
  percent?: string

}

export const DailyContestForm = Factory<DailyContestFormProps, DailyContestFormResult>(useDailyContestForm, DailyContestFormView)