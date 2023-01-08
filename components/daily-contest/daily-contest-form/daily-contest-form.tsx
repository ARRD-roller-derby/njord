import Factory from "../../_layouts/Factory/Factory";
import { useDailyContestForm } from "./daily-contest-form.hook";
import { DailyContestFormView } from "./daily-contest-form.view";

export type Question = {
  _id: string,
  question: string,
  choices: string[],
  percent: number,
  multiChoice?: boolean,
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
  selectChoice: (choice: string, isMulti: boolean) => void
  handleSubmit: () => void
  total: number
  current: number
  answers: Object,
  loading: boolean
  responses?: Array<{ id: string, answers: string[] }>
  percent?: string,
  canISubmit: boolean

}

export const DailyContestForm = Factory<DailyContestFormProps, DailyContestFormResult>(useDailyContestForm, DailyContestFormView)