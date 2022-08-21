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
    subType?:requestType
    league?: string
    email?:string
    name?:string
  }
}
