import { FC } from "react";
import Info from "../../_ui/Info/Info";
import SubmitButton from "../../_ui/SubmitButton/SubmitButton";
import { DailyContestForm } from "../daily-contest-form/daily-contest-form";
import { DailyContestButtonProps, DailyContestButtonResult } from "./daily-contest-button";

export const DailyContestButtonView: FC<DailyContestButtonProps & DailyContestButtonResult> = ({ openPopin, closePopin, loading, isOpenPopin, cantPlay, questions }) => (
  <>
    {cantPlay ? <Info>{"Tu ne peux plus jouer aujourd'hui"}</Info> : <SubmitButton loading={loading} text='Participer' onClick={openPopin} />}
    {(isOpenPopin && questions) && <DailyContestForm questions={questions} closePopin={closePopin} />}
  </>
)