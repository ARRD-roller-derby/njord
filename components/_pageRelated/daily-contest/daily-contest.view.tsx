import dayjs from "dayjs";
import { FC } from "react";
import PageActions from "../../_ui/PageActions/PageActions";
import { DailyContextFactoryResult } from "./daily-contest";
import { DailyContestButton } from "../../daily-contest/daily-contest-button/daily-contest-button";
import styles from './daily-contest.module.css'
import Tabs from "../../_ui/Tabs/Tabs/Tabs";
import Tab from "../../_ui/Tabs/Tab/Tab/Tab";
import { DailyContestRanking } from "../../daily-contest/daily-contest-ranking/daily-contest-ranking";

export const DailyContestView: FC<DailyContextFactoryResult> = ({ quiz, cantPlay }) => (
  <div className={styles.container}>

    <div className={styles.title}>Quizz du {dayjs(quiz.day).format('LL')}</div>
    <PageActions>
      <DailyContestButton cantPlay={cantPlay} />
    </PageActions>
    <div className={styles.title}>Classement</div>
    <Tabs defaultCurrent="aujourd'hui">
      <Tab field="hier">
        <DailyContestRanking date={1} />
      </Tab>
      <Tab field="aujourd'hui">
        <DailyContestRanking date={0} />
      </Tab>
    </Tabs>
  </div>
)