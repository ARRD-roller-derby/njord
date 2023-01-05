import { IRankingGeneralUser } from "../../../types/ranking-quiz.interface";
import { RankingGeneralCardList } from "./ranking-general-card-list";
import { RankingGeneralCardNormal } from "./ranking-general-card-normal/ranking-general-card-normal";

interface RankingGeneralCardProps {
  user: IRankingGeneralUser
  type: 'percent' | 'speed'
  myId: string
  podium: number[]
}

export const RankingGeneralCard: React.FC<RankingGeneralCardProps> = ({ user, type, myId, podium }) => {

  const Component = RankingGeneralCardList.find(card => card.name === user?.['rank_card_' + type])

  if (!Component) return <RankingGeneralCardNormal user={user} type={type} myId={myId} podium={podium} />
  return (<Component.component user={user} type={type} myId={myId} podium={podium} />
  )
}