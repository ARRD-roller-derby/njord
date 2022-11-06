import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function useCanIMakeThis(
  id: string,
  profiles: boolean | Array<String>,
  onlyProfile?: boolean
): boolean {
  const { data: session } = useSession(),
    [youCan, setyouCan] = useState<boolean>(false);

  function authMe() {
    if (session.isAdmin) return setyouCan(true);
    //User can edit your field, admin can't. But i can't if onlyAdmin
    if (id === session.user._id && !onlyProfile) return setyouCan(true);

    //All profile
    if (
      typeof profiles === "boolean" &&
      profiles === true &&
      session.user.profiles.length > 0
    ) {
      return setyouCan(true);
    }

    if (Array.isArray(profiles))
      return setyouCan(
        !!session.user.profiles.find(
          (profile: string) => !!profiles?.includes(profile)
        )
      );

    return setyouCan(false);
  }

  useEffect(() => {
    if (session) authMe();
  }, [session]);

  return youCan;
}
