import { RankingUserInterface } from "../../../types/ranking-quiz.interface";
import { PaginationProvider } from "../../pagination/pagination.provider";
import Factory from "../../_layouts/Factory/Factory";
import { useDailyContestRanking } from "./daily-contest-ranking.hook";
import { DailyContestRankingView } from "./daily-contest-ranking.view";

export interface DailyContestRankingFactoryProps {
  date: number
}

export interface DailyContestRankingFactoryResult {
  ranking: RankingUserInterface[],
  loading: boolean,
  reSync: () => void,
  myId: string
  faster: number,
  slower: number
}

const DailyContestRankingFactory = Factory<DailyContestRankingFactoryProps, DailyContestRankingFactoryResult>(useDailyContestRanking, DailyContestRankingView)

export const DailyContestRanking: React.FC<DailyContestRankingFactoryProps> = ({ date }) => (
  <PaginationProvider>
    <DailyContestRankingFactory date={date} />
  </PaginationProvider>
);
