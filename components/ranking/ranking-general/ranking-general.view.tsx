import Pagination from "../../pagination/pagination";
import LoaderWheel from "../../_ui/LoaderWheel/LoaderWheel";
import { RankingGeneralCard } from "../ranking-general-card/ranking-general-card";
import { RankingGeneralFactoryProps, RankingGeneralFactoryResult } from "./ranking-general";
import styles from './ranking-general.module.css'

export const RankingGeneralView: React.FC<RankingGeneralFactoryProps & RankingGeneralFactoryResult> = ({ loading, ranking, type, myId }) => (
  <div className={styles.container}>
    {loading && <LoaderWheel />}

    <div className={styles.items}>
      {ranking && ranking.length === 0 && <div>Aucun participant.</div>}
      {!loading &&
        ranking &&
        <>
          {ranking.map((user) => (
            <RankingGeneralCard
              key={user._id}
              user={user}
              type={type}
              myId={myId}
            />
          ))}

          <Pagination />
        </>}

    </div>
  </div>
)