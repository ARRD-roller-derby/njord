import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function usePush() {
  const [isConnected, setIsConnected] = useState<boolean>(false),
    { data: session } = useSession();

  async function addPush(beamsClient: any) {
    if (isConnected) return;
    const pushClient = await beamsClient?.start();
    try {
      const isReady = pushClient.instanceId
      if (!pushClient || !isReady) return
      console.log("Vous pouvez recevoir des notifs");
      setIsConnected(true);
    } catch (e) {
      console.log("Votre navigateur bloque les notif push", e);
      return;
    }

    console.log(pushClient)

    try {
      await pushClient?.addDeviceInterest("league-public");
    } catch (e) {
      console.log(e)
    }
    try {
      await pushClient?.addDeviceInterest("user-" + session.user._id);
    } catch (e) {
      console.log(e)
    }

    try {
      for (const profile of session.user?.profiles) {
        await pushClient?.addDeviceInterest("profile-" + profile);
      }
    } catch (e) {
      console.log(e)
    }

    if (session?.user?.league) {
      try {
        await pushClient?.addDeviceInterest("league-" + session.user.league.id);
      } catch (e) {
        console.log(e)
      }
    }

  }
  useEffect(() => {

    if (navigator) {
      if (navigator.userAgent.match(/Mi|iPhone|iPad|Crosscall/)) return
    }
    if (session && session.user && !isConnected) {
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: process.env.NEXT_PUBLIC_PUSHER_BEAMS,
      });

      if (beamsClient) addPush(beamsClient);

    }
  }, [session]);

  return isConnected;
}
