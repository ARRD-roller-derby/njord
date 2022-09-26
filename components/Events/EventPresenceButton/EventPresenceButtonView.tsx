import classes from './EventPresenceButton.module.css'
import { Props, useProps } from './EventPresenceButton.type'

const EventPresenceButtonView = ({
  handleSubmit,
  presence,
  loading,
}: Props & useProps) => {
  return (
    <div
      className={classes.button}
      onClick={() => handleSubmit()}
      data-presence={presence ? 'oui' : 'non'}
      data-loading={loading}
    >
      <div className={classes.yes}>oui</div>
      <div className={classes.non}>non</div>
    </div>
  )
}

export default EventPresenceButtonView
