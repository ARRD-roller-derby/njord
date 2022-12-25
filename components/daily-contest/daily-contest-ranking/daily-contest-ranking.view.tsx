import { FC } from "react";
import LoaderWheel from "../../_ui/LoaderWheel/LoaderWheel";
import styles from './daily-contest-ranking.module.css'
import { DailyContestRankingFactoryProps, DailyContestRankingFactoryResult } from "./daily-contest-ranking";
import Pagination from "../../pagination/pagination";

export const DailyContestRankingView: FC<DailyContestRankingFactoryProps & DailyContestRankingFactoryResult> = ({ loading, ranking }) => (
  <div className={styles.container}>
    {loading && <LoaderWheel />}

    <div className={styles.items}>
      {ranking && ranking.length === 0 && <div>Aucun participant.</div>}
      {!loading &&
        ranking &&
        <>
          {ranking.map((user) => (
            <p key={user.ranking._id}>{user.user?.derbyName} {user.ranking.percent}</p>
          ))}
          <Pagination />
        </>}

    </div>
  </div>
)