import { PaginationProvider } from "../../pagination/pagination.provider"
import Factory from "../../_layouts/Factory/Factory"
import { useQuestions } from "./questions.hook";
import { QuestionsResults } from "./questions.type";
import { QuestionsView } from "./questions.view";

const QuestionsFactory = Factory<unknown, QuestionsResults>(useQuestions, QuestionsView)

export const Questions: React.FC = () => (
  <PaginationProvider>
    <QuestionsFactory />
  </PaginationProvider>
);
