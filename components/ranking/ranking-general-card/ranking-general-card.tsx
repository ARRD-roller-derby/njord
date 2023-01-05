import { IRankingGeneralUser } from "../../../types/ranking-quiz.interface";
import { RankingGeneralCardList } from "./ranking-general-card-list";
import { RankingGeneralCardNormal } from "./ranking-general-card-normal/ranking-general-card-normal";

interface RankingGeneralCardProps {
  user: IRankingGeneralUser
  type: 'percent' | 'speed'
  myId: string
}

export const RankingGeneralCard: React.FC<RankingGeneralCardProps> = ({ user, type, myId }) => {

  const Component = RankingGeneralCardList.find(card => card.name === user?.['rank_card_' + type])

  if (!Component) return <RankingGeneralCardNormal user={user} type={type} myId={myId} />
  return (<Component.component user={user} type={type} myId={myId} />
  )
}