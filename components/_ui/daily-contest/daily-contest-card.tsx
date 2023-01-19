/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import { FC } from "react";
import { RankingUserInterface } from "../../../types/ranking-quiz.interface";
import userNameRender from "../../../utils/userNameRender";
import Avatar from "../Avatar/Avatar";
import { SpeedBar } from "../speed-bar/speed-bar";
import styles from './daily-contest-card.module.css'


interface DailycontestCardProps {
  user: RankingUserInterface
  myId: string
  position: number
  variant?: string
  faster: number
  slower: number
}

const regexVariantPremium = /shiny/;
export const DailycontestCard: FC<DailycontestCardProps> = ({ user, myId, position, faster, slower, variant = 'normal' }) => (
  <div className={styles.container} data-isme={myId === user.user._id} data-varian={user.user?.rank_card} data-variant={variant}>

    <div className={styles.avatarContainer} style={{ backgroundImage: variant.match(regexVariantPremium) ? `url('${user.user.avatar}')` : 'transparent' }}>
      <div className={styles.avatar}>
        {!variant.match(regexVariantPremium) && <Avatar src={user.user.avatar} />}
      </div>
    </div>

    <div className={styles.nameContainer}>
      <div className={styles.name}>
        {userNameRender(user.user, true)}
      </div>
    </div>
    <div className={styles.positionContainer}>
      <div className={styles.position}>
        {"#"}{position}
      </div>
    </div>

    <div className={styles.scoreContainer}>
      <div className={styles.score}>
        {variant.match(regexVariantPremium) ? <div style={{ right: `calc(100% - ${user.ranking.percent}%)` }} className={styles.scoreBar} /> : user.ranking.percent + "%"}
      </div>
    </div>

    <div className={styles.speedContainer}>
      <SpeedBar speed={user.ranking?.speed || user.ranking.score} slower={slower} faster={faster} />
    </div>
  </div>
)