export interface LeagueInterface {
  _id: string
  id_association: string
  name: string
  city: string
  zipCode:string
  teams: Array<String>
  shortName: string,
  resume: string,
  webSite:string,
  admins:Array<String>
}
