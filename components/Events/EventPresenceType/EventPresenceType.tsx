import Factory from "../../_layouts/Factory/Factory";
import { Props, useProps } from "./EventPresenceType.type";
import EventPresenceTypeView from "./EventPresenceTypeView";
import useEventPresenceType from './useEventPresenceType';

const EventPresenceType = Factory<Props,useProps>(useEventPresenceType,EventPresenceTypeView)

export default EventPresenceType
