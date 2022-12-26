import { createContext } from "react";
import { Fetch } from "../../../types/fetch.interface";
import { QuestionInterface } from "../../../types/question.interface";
export const QuestionsContext = createContext<Fetch<{ questions: QuestionInterface[], totalPage: number }>>(null);