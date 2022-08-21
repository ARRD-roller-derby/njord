import { Schema, model, models, Types } from 'mongoose'
import { SessionDb } from '../types/SessionDb.interface'

const sessionSchema = new Schema<SessionDb>({
    sessionToken: String,
    userId: Types.ObjectId,
    expires: Date,
  }),
  Session = models.sessions || model('sessions', sessionSchema)

export default Session
