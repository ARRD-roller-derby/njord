import { FC } from "react";
import { contestCardPrices } from "../../../datasources/contest_card_prices";
import AutoConfirmButton from "../../_ui/AutoConfirmButton/AutoConfirmButton";
import { DailycontestCard } from "../../_ui/daily-contest/daily-contest-card";
import Info from "../../_ui/Info/Info";
import { ShopContestResult } from "./shop-contest";
import styles from './shop-contest.module.css';

const ranking = {
  _id: 'id',
  quizId: 'string',
  userId: 'string',
  start: new Date(),
  end: new Date(),
  answers: [],
  percent: 90,
  score: 80,
  updatedAt: new Date()
}
export const ShopContestView: FC<ShopContestResult> = ({ user, loading, buy }) => (
  <div className={styles.container}>
    <div className={styles.box}>
      <div className={styles.cards}>
        {contestCardPrices.map(card => <div key={card.name}>
          <div className={styles.card} key={card.name}>
            <DailycontestCard user={{ user, ranking }} myId={"id"} position={1} variant={card.name} />
            {user.rank_card === card.name ? <Info>Tu possèdes cette carte</Info> :
              <>           <div className={styles.price}>{card.cost} dr.</div>
                <div className={styles.button}>
                  <AutoConfirmButton
                    textConfirm="Je confirme l'achat"
                    onClick={() => buy(card.name)}
                    loading={loading}
                    text="acheter" />
                </div>


              </>}
          </div>
        </div>)}
      </div>
    </div>

  </div>
)