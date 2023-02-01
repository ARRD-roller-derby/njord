import { Schema, model, models } from 'mongoose'
import { IPoll, IPollOption, IPollVote } from '../types/poll.interface'

const pollOptionsShema = new Schema<IPollOption>({
  id: String,
  text: String,
})

const pollVoteShema = new Schema<IPollVote>({
  optionId: String,
  userId: String,
})

const pollSchema = new Schema<IPoll>({
  description: String,
  multiChoice: Boolean,
  options: [pollOptionsShema],
  votes: [pollVoteShema],
  visibility:
  {
    type: String,
    enum: ['league', 'public'],
  }
  ,
  expireAt: Date,
  createdAt: Date,
  profile: String,
  leagueId: String,
  updatedAt: Date,
})

const Poll = models.polls || model('polls', pollSchema)

pollSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Poll