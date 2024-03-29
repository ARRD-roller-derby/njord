
import { IRankingGeneralUser } from "../../../../types/ranking-quiz.interface"
import { getPodiumPlace } from "../../../../utils/getPodiumPlace"
import userNameRender from "../../../../utils/userNameRender"
import Avatar from "../../../_ui/Avatar/Avatar"
import styles from './ranking-general-card-normal.module.css'

interface RankingGeneralCardNormalProps {
  user: IRankingGeneralUser
  myId: string
  type: 'percent' | 'speed'
  podium: number[]
}

export const RankingGeneralCardNormal: React.FC<RankingGeneralCardNormalProps> = ({ user, myId, type, podium }) => (<div className={styles.container} data-isme={myId === user._id} >

  <div className={styles.avatarContainer} >
    <div className={styles.avatar}>
      <Avatar src={user.avatar} />
    </div>
  </div>

  <div className={styles.nameContainer}>
    <div className={styles.name}>
      {userNameRender(user, true)}
    </div>
  </div>
  <div className={styles.scoreContainer}>
    <div className={styles.score}>
      {`#${getPodiumPlace(podium, user, type)} - `}
      {user[type === 'percent' ? 'dailyContestAvgAccuracy' : 'dailyContestAvgTime'].toFixed(2)}
      {type === 'percent' ? '%' : ' points'}
    </div>
  </div>
</div>)