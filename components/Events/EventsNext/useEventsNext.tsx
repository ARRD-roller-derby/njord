import { useContext, useEffect, useMemo, useState } from "react";
import { PusherContext } from "../../../stores/pusher.store";
import { EventInterface } from "../../../types/Event.interface";
import useSilentDBSync from "../../_hooks/useSilentDBSync";
import eventTitleRender from "../../../utils/eventTitleRender";
import dayjs from "dayjs";

export default function useEventsNext(id: string) {
  const {
      data: eventsDb,
      loading,
      reSync,
    } = useSilentDBSync<Array<EventInterface>>("events/next", "events"),
    [triggerRefresh] = useContext(PusherContext),
    selectByType = useMemo(() => {
      return eventsDb
        ?.reduce((acc, event) => {
          const isExist = acc.find(
            (select: { label: string; value: string }) =>
              select.value === event.type
          );
          if (!isExist) {
            acc.push({
              label: `${eventTitleRender(event)} (1)`,
              count: 1,
              value: event.type,
            });
          } else {
            const newSelect = { ...isExist },
              index = acc.findIndex(
                (select: { label: string; value: string }) =>
                  select.value === event.type
              );
            newSelect.count = isExist.count + 1;
            newSelect.label = `${eventTitleRender(event)} (${newSelect.count})`;
            acc.splice(index, 1, newSelect);
          }
          return acc;
        }, [])
        .sort((a, b) => b.start - a.start);
    }, [eventsDb]),
    [currentType, setCurrentType] = useState<{ label: string; value: string }>({
      label: "tous",
      value: "tous",
    }),
    events = useMemo(
      () =>
        eventsDb
          ? eventsDb.filter((event) => {
              if (currentType.value === "tous") return true;
              return event.type === currentType?.value;
            })
          : undefined,
      [currentType, eventsDb]
    );

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === "event") {
      reSync();
    }
  }, [triggerRefresh]);

  useEffect(() => {
    if (selectByType && !currentType) {
      setCurrentType(
        selectByType.find((select) => select.value === "training") ||
          selectByType.at(0)
      );
    }
  }, [selectByType]);

  return {
    id,
    events: events
    //prevent hour server problem
      ?.filter((event) => dayjs(event.end).diff(dayjs(), "day") >= 0)
      .sort((a: any, b: any) => {
        const parseDate = (date:Date,hour:string)=> `${dayjs(date).format('YYYY-MM-DD')}T${hour}:00.000Z`
        const 
          startDate = dayjs(parseDate(a.start,a.hourStart)),
          endDate = dayjs(parseDate(b.start,b.hourStart))
        return dayjs(startDate).diff(endDate, "hour")
      })
,
    loading,
    currentType,
    setCurrentType,
    reSync,
    selectByType,
  };
}
