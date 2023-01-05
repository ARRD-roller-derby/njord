import { IRankingGeneralUser } from "../../../types/ranking-quiz.interface";
import { RankingGeneralCardNormal } from "./ranking-general-card-normal/ranking-general-card-normal";

export const RankingGeneralCardList: Array<{ type: 'speed' | 'percent', component: React.FC<{ user: IRankingGeneralUser, type: 'speed' | 'percent', myId: string, podium: number[] }>, name: string }> = [
  {
    type: 'speed',
    name: 'normal',
    component: RankingGeneralCardNormal
  }
]