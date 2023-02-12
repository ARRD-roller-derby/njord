import { IRankingGeneralUser } from "../../../types/ranking-quiz.interface";
import { RankingGeneralCardNormal } from "./ranking-general-card-normal/ranking-general-card-normal";
import { RankingGeneralCardSpeed } from "./ranking-general-card-speed/ranking-general-card-speed";

export const RankingGeneralCardList: Array<{ type: 'speed' | 'percent', component: React.FC<{ user: IRankingGeneralUser, type: 'speed' | 'percent', faster: number, slower: number, myId: string, podium: number[] }>, name: string }> = [
  {
    type: 'speed',
    name: 'speed',
    component: RankingGeneralCardSpeed
  },
  {
    type: 'percent',
    name: 'speed',
    component: RankingGeneralCardNormal
  }
]