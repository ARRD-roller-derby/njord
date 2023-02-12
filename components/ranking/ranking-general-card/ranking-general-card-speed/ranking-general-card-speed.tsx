
import { IRankingGeneralUser } from "../../../../types/ranking-quiz.interface"
import { getPodiumPlace } from "../../../../utils/getPodiumPlace"
import userNameRender from "../../../../utils/userNameRender"
import Avatar from "../../../_ui/Avatar/Avatar"
import { SpeedBar } from "../../../_ui/speed-bar/speed-bar"
import styles from './ranking-general-card-speed.module.css'

interface RankingGeneralCardNormalProps {
  user: IRankingGeneralUser
  myId: string
  podium: number[]
  faster: number
  slower: number
}

export const RankingGeneralCardSpeed: React.FC<RankingGeneralCardNormalProps> = ({ user, myId, podium, faster, slower }) => (<div className={styles.container} data-isme={myId === user._id} >

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
      {`#${getPodiumPlace(podium, user, 'speed')}`}

    </div>

  </div>
  <div className={styles.speedContainer}>
    <SpeedBar speed={user.dailyContestAvgTime} slower={slower} faster={faster} />
  </div>
</div>)