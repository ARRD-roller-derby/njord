import { useState, useEffect } from "react";
import { EventInterface } from "../../../types/Event.interface";
import useIsMobileDevice from "../../_hooks/useIsMobileDevice";
import { EventCardProps, EventCardResult } from "./event-card.type";

export const useEventCard = ({ event }: EventCardProps): EventCardResult => {
  const isMobileDevice = useIsMobileDevice(),
    [shutter, setShutter] = useState<EventInterface | null>(null);

  useEffect(() => {
    if (shutter) setShutter(event);
  }, [event]);

  return { isMobileDevice, shutter, setShutter };
};
