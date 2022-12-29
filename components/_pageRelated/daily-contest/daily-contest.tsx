import { QuizInterface } from "../../../types/quiz.interface";
import useFetch from "../../_hooks/useFetch";
import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated";
import Factory from "../../_layouts/Factory/Factory";
import LoaderWheel from "../../_ui/LoaderWheel/LoaderWheel";
import { DailyContestContext } from "./daily-contest.context";
import { useDailyContest } from "./daily-contest.hook";
import { DailyContestView } from "./daily-contest.view";


export interface DailyContextFactoryResult {
  quiz?: QuizInterface
  cantPlay?: boolean
}

export const DailyContestFactory = Factory<unknown, DailyContextFactoryResult>(useDailyContest, DailyContestView)

//TODO classement a part TODO --> mettre  in interface dédié
export const DailyContest: React.FC = () => {
  const ctx = useFetch<QuizInterface[]>("quiz/daily");

  return (
    <DailyContestContext.Provider value={ctx}>
      <AuthentificatedLayout>
        {ctx.loading && <LoaderWheel />}
        {ctx.data && <DailyContestFactory />}
      </AuthentificatedLayout>
    </DailyContestContext.Provider>
  );
};
