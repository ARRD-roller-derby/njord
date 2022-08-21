import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function usePush() {
  const [isConnected, setIsConnected] = useState<boolean>(false),
    { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: process.env.NEXT_PUBLIC_PUSHER_BEAMS,
      });

      if (beamsClient) {
        beamsClient
          .start()
          .then((beamsClient:any) => beamsClient.getDeviceId())
          .then((_deviceId) =>
            console.log("Vous pouvez recevoir des notifs")
          )
          // Sub to all profiles and leagues push
          .then(() => {
            session.user.profiles.forEach((profile: string) => {
              beamsClient.addDeviceInterest(profile);
            });
            session.user.leagues.forEach((league: string) => {
              beamsClient.addDeviceInterest(league);
            });
          })
          //private msg
          .then(() => beamsClient.addDeviceInterest("user-" + session.user._id))
          .then(() => setIsConnected(true))
          .catch(console.error);
      }
    }
  }, [session]);

  return isConnected;
}
