import { FC } from "react";
import { IRankingGeneralUser } from "../../../types/ranking-quiz.interface";
import { PaginationProvider } from "../../pagination/pagination.provider";
import useFetch from "../../_hooks/useFetch";
import Factory from "../../_layouts/Factory/Factory";
import { RankingGeneralContext } from "./ranking-general.context";
import { useRankingGeneral } from "./ranking-general.hook";
import { RankingGeneralView } from "./ranking-general.view";

export interface RankingGeneralFactoryProps {
  type: 'percent' | 'speed'
}

export interface RankingGeneralFactoryResult {
  ranking: IRankingGeneralUser[],
  loading: boolean,
  myId: string
}

const RankingGeneralFactory: React.FC<RankingGeneralFactoryProps> = Factory<unknown, RankingGeneralFactoryResult>(useRankingGeneral, RankingGeneralView);

export const RankingGeneral: FC<RankingGeneralFactoryProps> = (props) => {
  const ctx = useFetch('ranking/general', { type: props.type })

  return (<RankingGeneralContext.Provider value={ctx}>
    <PaginationProvider>
      <RankingGeneralFactory {...props} />
    </PaginationProvider>
  </RankingGeneralContext.Provider>)
} 