import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function usePush() {
  const [isConnected, setIsConnected] = useState<boolean>(false),
    { data: session } = useSession();

  async function addPush(beamsClient: any) {
    try {
      const pushClient = await beamsClient.start();
      if (pushClient) console.log("Vous pouvez recevoir des notifs");
    } catch (e) {
      console.log("Votre navigateur bloque les notif push", e);
      return;
    } finally {
      setIsConnected(true);
    }
    session.user.profiles.forEach((profile: string) => {
      beamsClient.addDeviceInterest("profile-" + profile);
    });
    beamsClient.addDeviceInterest("league-public");
    if (session?.user?.league)
      beamsClient.addDeviceInterest("league-" + session.user.league.id);
    //private msg
    beamsClient.addDeviceInterest("user-" + session.user._id);
  }
  useEffect(() => {
    if(navigator){
      if(navigator.userAgent.match(/Mi|iPhone|iPad/))return
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
