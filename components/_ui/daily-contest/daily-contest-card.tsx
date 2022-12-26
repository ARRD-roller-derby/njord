import { FC } from "react";
import { RankingUserInterface } from "../../../types/ranking-quiz.interface";
import userNameRender from "../../../utils/userNameRender";
import Avatar from "../Avatar/Avatar";
import styles from './daily-contest-card.module.css'

interface DailycontestCardProps {
  user: RankingUserInterface
  myId: string
  position: number
}

export const DailycontestCard: FC<DailycontestCardProps> = ({ user, myId, position }) => (
  <div className={styles.container} data-isme={myId === user.user._id} data-varian={user.user?.rank_card}>

    <div className={styles.avatarContainer}>
      <div className={styles.avatar}>
        <Avatar src={user.user.avatar} />
      </div>
    </div>

    <div className={styles.nameContainer}>
      <div className={styles.name}>
        {user.user?.derbyName || userNameRender(user.user)}
      </div>
    </div>
    <div className={styles.positionContainer}>
      <div className={styles.position}>
        {"#"}{position}{" - "}
      </div>
    </div>

    <div className={styles.scoreContainer}>
      <div className={styles.score}>
        {user.ranking.percent}{"%"}
      </div>
    </div>
  </div>
)