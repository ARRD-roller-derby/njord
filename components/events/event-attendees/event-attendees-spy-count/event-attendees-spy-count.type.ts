import { AvailableFeatureInterface } from "../../../../types/feature.interface"

export type EventAttendeesSpyCountProps = {
  eventId: string
}

export type EventAttendeesSpyCountResult = {
  feature: AvailableFeatureInterface,
  buy: () => void,
  loading: boolean,
  counts: Array<{ type: string; count: number }>
}

