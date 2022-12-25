import Factory from "../../_layouts/Factory/Factory";
import { Question } from "../daily-contest-form/daily-contest-form";
import { useDailyContestButton } from "./daily-contest-button.hook";
import { DailyContestButtonView } from "./daily-contest-button.view";

export interface DailyContestButtonProps {
  cantPlay: boolean
}


export interface DailyContestButtonResult {
  loading: boolean
  openPopin: () => void
  isOpenPopin: boolean
  closePopin: () => void,
  questions: Question[]
}

export const DailyContestButton = Factory<
  DailyContestButtonProps, DailyContestButtonResult>(useDailyContestButton, DailyContestButtonView)
