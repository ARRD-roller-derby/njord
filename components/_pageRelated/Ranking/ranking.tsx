import { RankingGeneral } from '../../ranking/ranking-general/ranking-general'
import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated'
import { Gridbox } from '../../_ui/grid-box/grid-box'
import Tab from '../../_ui/Tabs/Tab/Tab/Tab'
import Tabs from '../../_ui/Tabs/Tabs/Tabs'
import styles from './ranking.module.css'

export const Ranking: React.FC = () => (
  <AuthentificatedLayout>
    <div className={styles.container}>
      <h1>Classement</h1>
      <Gridbox>
        <Tabs defaultCurrent='Précision'>
          <Tab field='Précision' ><RankingGeneral type='percent' /></Tab>
          <Tab field="vitesse moyenne"><RankingGeneral type='speed' /></Tab>
        </Tabs>
      </Gridbox>
    </div>
  </AuthentificatedLayout>

)