import { FeatureInterface } from "../../../types/feature.interface"
import useSilentFetch from "../../_hooks/useSilentFetch"
import usePost from '../../_hooks/usePost';
import { availableFeatures } from "../../../datasources/availableFeatures";
import { useContext, useEffect } from 'react';
import { EventAttendeesContext } from "../../events/event-attendees/event-attendees.context";

export default function useEventAttendessBuy() {
  const
    { data: feature, fetch } = useSilentFetch<FeatureInterface | boolean>('feature/attendees'),
    { name, cost } = availableFeatures.find(availableFeature => availableFeature.name === 'attendees_for_day'),
    { data: purchase, loading, post } = usePost('/feature/buy'),
    { refetch } = useContext(EventAttendeesContext)

  useEffect(() => {
    if (purchase) {
      fetch()
      refetch()
    }
  }, [purchase])

  return { feature, buy: () => post({ name }), cost, loading }
}