/* eslint-disable @next/next/no-img-element */
import { percentRange } from '../../../utils/percent-range'
import { MarkerIcon } from '../icons/marker-icon'
import { RabbitIcon } from '../icons/rabbit-icon'
import { TurtleIcon } from '../icons/turtle-icon'
import styles from './speed-bar.module.css'

export interface SpeedBarProps {
  slower: number
  faster: number
  speed: number
}
export const SpeedBar: React.FC<SpeedBarProps> = ({ speed, slower, faster }) => (
  slower && faster ? <div className={styles.container}>

    <div className={styles.bar}>
      <div className={styles.speed} style={{ left: `${percentRange(slower, faster, speed)}%` }}>


        <div className={styles.marker}>
          <MarkerIcon />
        </div>
      </div>
    </div>
    <div className={styles.icon}>
      <TurtleIcon />

    </div>
    <div className={styles.road} />
    <div className={styles.icon}>
      <RabbitIcon />

    </div>
  </div> : <div />

)