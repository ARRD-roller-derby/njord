import { useContext, useEffect, useMemo } from "react";
import { SocketContext } from "../../../stores/socket.store";
import { AttendeeInterface } from "../../../types/attendee.interface";
import searchTypeOfPresence from "../../../utils/searchTypeOfPresence";
import { EventAttendeesContext } from "./event-attendees.context";
import {
  EventAttendeesResult,
  EventAttendeesProps,
  EventAttendeesCountProps,
} from "./event-attendees.type";

export const useEventAttendees = ({
  event,
}: EventAttendeesProps): EventAttendeesResult => {
  const { data, loading, refetch, reSync } = useContext(EventAttendeesContext),
    [triggerRefresh] = useContext(SocketContext),
    counts = useMemo(() => {
      if (!data || !data?.attendees) return [];
      return data.attendees
        .filter((attendee: AttendeeInterface) => attendee.isPresent)
        .reduce((acc: EventAttendeesCountProps[], value: AttendeeInterface) => {
          const isExist = acc.find(
            (old) => old.type === searchTypeOfPresence(value, event.type)
          );

          const count = value?.guestNumber ?? 1
          if (isExist) {
            const index = acc.findIndex((old) => old.type === isExist.type);
            acc.splice(index, 1, { ...isExist, count: isExist.count + count });
          } else {
            acc.push({
              type: searchTypeOfPresence(value, event.type),
              count,
            });
          }
          return acc;
        }, []);
    }, [data]);


  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === "event_attendees") {
      reSync();
    }
  }, [triggerRefresh]);

  return {
    attendees: data?.attendees,
    IcantSee: data?.IcantSee,
    loading,
    refetch,
    counts,
  };
};
