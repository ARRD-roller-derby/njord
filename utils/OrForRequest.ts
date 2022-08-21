import League from '../models/league.model'
import { requestType } from '../types/requestType.enum'
import { UserInterface } from '../types/User.interface'

export default async function OrForRequest(session: any): Promise<Array<any>> {
  const OR = []
  // admin league request
  if (session.user.admin) {
    const leagues = await League.find(
      {
        admins: {
          $size: 0,
        },
      },
      '_id'
    )

    OR.push({
      'value.leagueId': {
          $in: leagues.map((o: UserInterface) => o._id),
        },
    })
  }

  // bureau league request
  if (
    session.user.profiles &&
    session.user.profiles.find((o: string) => o === 'bureau') &&
    session.user.league &&
    session.user.league.id
  ) {
    OR.push({
      type: requestType.league_join,
      'value.leagueId': session.user.league.id,
    })
  }

  //For user request
  OR.push({
    type: requestType.for_user,
    userId:session.user._id
  })

  return OR
}
