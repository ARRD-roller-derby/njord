import { useContext, useMemo } from "react";
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
  const { data, loading, refetch } = useContext(EventAttendeesContext),
    counts = useMemo(() => {
      if (!data || !data?.attendees) return [];
      return data.attendees
        .filter((attendee: AttendeeInterface) => attendee.isPresent)
        .reduce((acc: EventAttendeesCountProps[], value: AttendeeInterface) => {
          const isExist = acc.find(
            (old) => old.type === searchTypeOfPresence(value, event.type)
          );

          if (isExist) {
            const index = acc.findIndex((old) => old.type === isExist.type);
            acc.splice(index, 1, { ...isExist, count: isExist.count + 1 });
          } else {
            acc.push({
              type: searchTypeOfPresence(value, event.type),
              count: 1,
            });
          }
          return acc;
        }, []);
    }, [data]);

  return {
    attendees: data?.attendees,
    IcantSee: data?.IcantSee,
    loading,
    refetch,
    counts,
  };
};
