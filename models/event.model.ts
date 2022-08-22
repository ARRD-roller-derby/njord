import { Schema, model, models } from 'mongoose'
import { AttendeesEventInterface, EventInterface } from '../types/Event.interface';
import { adressSchema } from './adresses.model';

const attendees = new Schema<AttendeesEventInterface>({
  id: String,
  type: String,
  isPresent: Boolean
});

const eventSchema = new Schema<EventInterface>({
  start: Date,
  end: Date,
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
  attendees:[attendees],
  events:[String],
  address: adressSchema,
})

const Event = models.events || model('events', eventSchema)

eventSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

attendees.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Event