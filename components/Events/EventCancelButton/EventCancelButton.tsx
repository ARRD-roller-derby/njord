import EventCancelButtonView from "./EventCancelButton.view";
import useEventCancelButton from "./EventCancelButton.hook";
import { Props, useProps } from "./EventCancelButton.type";
import Factory from "../../_layouts/Factory/Factory";

const EventCancelButton = Factory<Props,useProps>(useEventCancelButton,EventCancelButtonView)
export default EventCancelButton
