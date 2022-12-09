import { availableFeatures } from "../../../../datasources/availableFeatures"
import usePost from "../../../_hooks/usePost"
import { EventAttendeesSpyCountProps, EventAttendeesSpyCountResult } from "./event-attendees-spy-count.type"

export const useEventAttendeesSpyCount = ({ eventId }: EventAttendeesSpyCountProps): EventAttendeesSpyCountResult => {
  const
    feature = availableFeatures.find(feat => feat.name === "attendees_count_for_day"),
    { data: counts, loading, post } = usePost('event/attendees_spy_count')

  const buy = () => {
    if (loading) return
    post({ eventId })
  }
  return {
    feature,
    counts: counts ?? [],
    loading,
    buy
  }
}
