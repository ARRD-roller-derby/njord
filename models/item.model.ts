import { Schema, model, models } from 'mongoose'
import { ItemInterface } from '../types/items.interface'

const localization = new Schema({
  type:String,
  id:String,
  name:String
});

const itemSchema = new Schema<ItemInterface>({
  name: String,
  picture_url: String,
  owner:String,
  ownerType:String,
  localization
})

const Item = models.items || model('items', itemSchema)

export default Item