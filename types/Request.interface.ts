import { requestType } from "./requestType.enum"

export interface RequestInterface {
  _id: string
  resume: string
  updatedAt: Date
  userId: string
  type: requestType
  token: string
  value: {
    shortName?:string
    leagueId?:string
    itemId?:string
    subType?:requestType
    userId?:string
    league?: string
    email?:string
    name?:string
  }
}
