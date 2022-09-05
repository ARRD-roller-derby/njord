import { FeatureInterface } from "../../../types/feature.interface"
import useSilentFetch from "../../_hooks/useSilentFetch"

interface Props {
  readonly reSync:Function
}

export default function useEventAttendessBuy({reSync}:Props){
  const {data:feature,fetch} = useSilentFetch<FeatureInterface|'no required'|boolean>('feature/attendees')
  return {feature}
}