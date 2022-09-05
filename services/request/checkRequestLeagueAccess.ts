import { MongoDb } from '../../db/mongo.connect'
import League from '../../models/league.model'
import { RequestInterface } from '../../types/Request.interface'

export default async function checkRequestLeagueAccess(
  request: RequestInterface,
  session: any
): Promise<boolean | Array<string>> {
  await MongoDb()

  if (request?.value?.leagueId) {
    const { admins } = await League.findById(request.value.leagueId, 'admins')

    if (admins.length === 0 && !session.isAdmin) {
      return false
    }

    if (admins.length > 0) {
      const iamLeagueAdmin = admins.find(
        (admin: string) => admin === session.user._id
      )
      if (!iamLeagueAdmin) {
        return admins
      }
    }
  } else {
    return false
  }

  return true
}
