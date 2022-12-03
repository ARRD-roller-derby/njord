import Factory from "../../_layouts/Factory/Factory";
import { useEventShutter } from "./event-shutter.hook";
import { EventShutterView } from "./event-shutter.view";
import { EventShutterProps, EventShutterResult } from "./event-shutter.type";

export const EventShutter = Factory<EventShutterProps, EventShutterResult>(
  useEventShutter,
  EventShutterView
);
