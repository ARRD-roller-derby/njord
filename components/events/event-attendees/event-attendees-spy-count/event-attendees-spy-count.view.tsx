import AutoConfirmButton from '../../../_ui/AutoConfirmButton/AutoConfirmButton';
import Info from '../../../_ui/Info/Info';
import LoaderWheel from '../../../_ui/LoaderWheel/LoaderWheel';
import { EventAttendeesCount } from '../event-attendees-count/event-attendees-count';
import styles from './event-attendees-spy-count.module.css';
import { EventAttendeesSpyCountResult } from './event-attendees-spy-count.type';

export const EventAttendeesSpyCountView: React.FC<EventAttendeesSpyCountResult> = ({ feature, buy, counts, loading }) => {

  return <div className={styles.container}>
    {counts.length === 0 && <><Info>
      Vous pouvez voir seule fois.
    </Info>
      <AutoConfirmButton
        isSpy
        text={`Voir le nombre de participant (${feature.cost} Dr.)`}
        textConfirm="Confirmer l'achat"
        onClick={() => buy()}
      />
    </>}
    {loading && <LoaderWheel />}
    {counts.map((count) => <EventAttendeesCount key={count.type} count={count} />)}
  </div>
}