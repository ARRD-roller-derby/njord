import { FC } from "react";
import { RankingUserInterface } from "../../../types/ranking-quiz.interface";
import userNameRender from "../../../utils/userNameRender";
import Avatar from "../Avatar/Avatar";
import styles from './daily-contest-card.module.css'

interface DailycontestCardProps {
  user: RankingUserInterface
}

export const DailycontestCard: FC<DailycontestCardProps> = ({ user }) => (
  <div className={styles.container}>

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
    <div className={styles.scoreContainer}>
      <div className={styles.score}>
        {user.ranking.percent}{"%"}
      </div>
    </div>
  </div>
)