import { Types } from 'mongoose'

export interface ItemInterface {
  _id: Types.ObjectId
  name: string
  picture_url?: string
  ownerType: ItemOwnerType
  ownerId: String
  localization: LocalizationItemInterface
  updatedAt: Date
}

export interface ItemWithHereInterface extends ItemInterface{
  isHere:boolean
}

export interface LocalizationItemInterface {
  type: 'user' | 'place'
  id: string
  name: string
  updatedAt: Date
}

export enum ItemOwnerType {
  user='user',
  league='league'
}

export enum ItemLocalizationType {
  user='user',
  place='place'
}