import Factory from "../../../_layouts/Factory/Factory";
import { useEventAttendeesSpyCount } from "./event-attendees-spy-count.hook";
import { EventAttendeesSpyCountProps, EventAttendeesSpyCountResult } from "./event-attendees-spy-count.type";
import { EventAttendeesSpyCountView } from "./event-attendees-spy-count.view";

export const EventAttendeesSpyCount = Factory<
  EventAttendeesSpyCountProps,
  EventAttendeesSpyCountResult
>(useEventAttendeesSpyCount, EventAttendeesSpyCountView);