import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { EventShutterResult, EventShutterProps } from "./event-shutter.type";

export const useEventShutter = ({
  event,
  setClose,
  url,
}: EventShutterProps): EventShutterResult => {
  const { data: session } = useSession(),
    router = useRouter(),
    uri = "/event/updateField";

  function handleClose() {
    router.push(url, url, { shallow: true });
    setClose();
  }

  useEffect(() => {
    if (event) router.push(url, "/event/" + event._id, { shallow: true });
  }, [event]);

  return { close: handleClose, uri, user: session.user };
};
