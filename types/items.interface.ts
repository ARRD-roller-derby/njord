import { Types } from 'mongoose'

export interface ItemInterface {
  _id: Types.ObjectId
  name: string
  picture_url?: string
  ownerType: ItemOnwerType
  ownerId: String
  localization: LocalizationItemInterface
  updatedAt: Date
}

export interface LocalizationItemInterface {
  type: 'user' | 'place'
  id: string
  name: string
  updatedAt: Date
}

export enum ItemOnwerType {
  user='user',
  league='league'
}

export enum ItemLocalizationType {
  user='user',
  place='place'
}