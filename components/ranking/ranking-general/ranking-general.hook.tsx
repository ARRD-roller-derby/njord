import { useSession } from "next-auth/react";
import { useContext } from "react";
import { TriggerEvents } from "../../../types/trigger-events.enum";
import { useSocketTrigger } from "../../_hooks/socket-trigger.hook";
import { RankingGeneralFactoryResult } from "./ranking-general";
import { RankingGeneralContext } from "./ranking-general.context";

export const useRankingGeneral = (): RankingGeneralFactoryResult => {
  const { data: session } = useSession()
  const { data, loading, reSync } = useContext(RankingGeneralContext);
  useSocketTrigger(TriggerEvents.daily_contest, reSync)
  return { ranking: data?.ranking, loading, myId: session?.user._id };
}