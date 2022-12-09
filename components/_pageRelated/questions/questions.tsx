import { QuestionInterface } from "../../../types/question.interface";
import { PaginationProvider } from "../../pagination/pagination.provider"
import useFetch from "../../_hooks/useFetch";
import Factory from "../../_layouts/Factory/Factory"
import { QuestionsContext } from "./question.context";
import { useQuestions } from "./questions.hook";
import { QuestionsResults } from "./questions.type";
import { QuestionsView } from "./questions.view";

const QuestionsFactory = Factory<unknown, QuestionsResults>(useQuestions, QuestionsView)

export const Questions: React.FC = () => {
  const ctx = useFetch<QuestionInterface[]>("questions/all");

  return <QuestionsContext.Provider value={ctx}>
    <PaginationProvider >
      <QuestionsFactory />
    </PaginationProvider>
  </QuestionsContext.Provider >
}
