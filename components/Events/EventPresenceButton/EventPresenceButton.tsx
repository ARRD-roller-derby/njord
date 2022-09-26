import EventPresenceButtonView from './EventPresenceButtonView'
import useEventPresenceButton from './useEventPresenceButton'
import Factory from '../../_layouts/Factory/Factory'
import { Props, useProps } from './EventPresenceButton.type'

const EventPresenceButton = Factory<Props, useProps>(
  useEventPresenceButton,
  EventPresenceButtonView
)

export default EventPresenceButton
