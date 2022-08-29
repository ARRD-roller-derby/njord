import { EventInterface } from '../../../types/Event.interface';
import classes from './EventPresenceButton.module.css';

interface Props {
  readonly event:EventInterface
  readonly typePresence: 'absent'|'present'
}

export default function EventPresenceButtonView({typePresence}:Props){

  return <button className={classes.button}>{typePresence === 'absent' ? 'absent':'présent'}</button>
}