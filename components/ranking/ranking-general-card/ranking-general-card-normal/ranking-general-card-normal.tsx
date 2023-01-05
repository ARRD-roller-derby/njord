
import { IRankingGeneralUser } from "../../../../types/ranking-quiz.interface"
import userNameRender from "../../../../utils/userNameRender"
import Avatar from "../../../_ui/Avatar/Avatar"
import styles from './ranking-general-card-normal.module.css'

interface RankingGeneralCardNormalProps {
  user: IRankingGeneralUser
  myId: string
  type: 'percent' | 'speed'
}

export const RankingGeneralCardNormal: React.FC<RankingGeneralCardNormalProps> = ({ user, myId, type }) => (<div className={styles.container} data-isme={myId === user._id} >

  <div className={styles.avatarContainer} >
    <div className={styles.avatar}>
      <Avatar src={user.avatar} />
    </div>
  </div>

  <div className={styles.nameContainer}>
    <div className={styles.name}>
      {user?.derbyName || userNameRender(user)}
    </div>
  </div>
  <div className={styles.scoreContainer}>
    <div className={styles.score}>
      {user[type === 'percent' ? 'dailyContestAvgAccuracy' : 'dailyContestAvgTime']}
      {type === 'percent' ? '%' : 'sec'}
    </div>
  </div>
</div>)