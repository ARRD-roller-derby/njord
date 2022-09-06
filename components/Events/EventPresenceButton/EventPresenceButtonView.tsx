import { EventInterface } from '../../../types/Event.interface'
import classes from './EventPresenceButton.module.css'

interface Props {
  readonly handleSubmit: Function
  readonly event: EventInterface
  readonly loading: boolean
}

export default function EventPresenceButtonView({
  handleSubmit,
  event,
  loading,
}: Props) {
  return (
    <div
      className={classes.button}
      onClick={() => handleSubmit()}
      data-presence={event?.presence?.isPresent ? 'oui' : 'non'}
      data-loading={loading}
    >
      <div className={classes.yes}>oui</div>
      <div className={classes.non}>non</div>
    </div>
  )
}
