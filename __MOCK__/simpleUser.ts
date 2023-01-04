import { UserInterface } from "../types/User.interface";

export const simpleUser: UserInterface = {
  _id: 'simple_user_id',
  email: 'simple@user.fr',
  name: 'simple',
  lastname: 'user',
  derbyName: 'mega shark',
  numRoster: '01',
  msp: false,
  mst: true,
  profiles: [],
  dailyContestAvgTime: 13,
  dailyContestAvgAccuracy: 50,
  league: {
    id: 'my_league_id',
    shortName: 'my league'
  }
}