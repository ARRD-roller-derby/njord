import { Schema, model, models } from 'mongoose'
import { addressInterface } from '../types/address.interface'

const adressSchema = new Schema<addressInterface>({
    lat: Number,
    lon: Number,
    label: String,
    ownerId: String,
    city: String,
    zipcode: String,
    street: String,
    type: String,
  }),
  Address = models.adresses || model('adresses', adressSchema)

adressSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Address
