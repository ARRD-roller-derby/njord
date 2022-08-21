import { MongoDb } from '../../db/mongo.connect'
import User from '../../models/user.model'

export default async function getSessionWithProfile({ session, token, user }) {
  if (token && session) {
    session.accessToken = token.accessToken
  }

  await MongoDb()

  session.user = await User.findOne({ email: user.email })

  if(!session.user.wallet){
    session.user.wallet = 100;
    session.user.save()
  }

  if (session.user) {
    session.user.id = session.user._id
    session.isAdmin = session.user.admin
  }
  return session
}
