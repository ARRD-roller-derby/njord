import { FC } from "react";
import LoaderWheel from "../../_ui/LoaderWheel/LoaderWheel";
import styles from './daily-contest-ranking.module.css'
import { DailyContestRankingFactoryProps, DailyContestRankingFactoryResult } from "./daily-contest-ranking";
import Pagination from "../../pagination/pagination";
import { DailycontestCard } from "../../_ui/daily-contest/daily-contest-card";

export const DailyContestRankingView: FC<DailyContestRankingFactoryProps & DailyContestRankingFactoryResult> = ({ loading, ranking, myId }) => (
  <div className={styles.container}>
    {loading && <LoaderWheel />}

    <div className={styles.items}>
      {ranking && ranking.length === 0 && <div>Aucun participant.</div>}
      {!loading &&
        ranking &&
        <>
          {ranking.map((user, index) => (
            <DailycontestCard
              key={user.ranking._id}
              user={user} myId={myId}
              position={index + 1}
              variant={user.user.rank_card}
            />
          ))}

          <Pagination />
        </>}

    </div>
  </div>
)