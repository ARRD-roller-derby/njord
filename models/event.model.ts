import { Schema, model, models } from 'mongoose'
import { AttendeesEventInterface, EventInterface } from '../types/Event.interface';
import { adressSchema } from './adresses.model';

const attendeesSchema = new Schema<AttendeesEventInterface>({
  userId: String,
  type: String,
  isPresent: Boolean,
  updatedAt:Date
});

const eventSchema = new Schema<EventInterface>({
  start: Date,
  end: Date,
  title:String,
  leagueId:String,
  hourStart:String,
  hourEnd:String,
  description: String,
  recurrenceId:String,
  visibility:String,
  cancel:Boolean,
  type:String,
  guests: [String],
  leaguesGuest: [String],
  items:[String],
  requirements:[String],
  attendees:[attendeesSchema],
  events:[String],
  address: adressSchema,
  versus:[String],
  updatedAt: Date
})

const Event = models.events || model('events', eventSchema)

export const Attendee = models.attendees || model('attendees', attendeesSchema)

eventSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

attendeesSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Event