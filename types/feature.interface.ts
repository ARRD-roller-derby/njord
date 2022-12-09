export interface FeatureInterface {
  _id: string
  name: string
  userId: string
  updatedAt: Date
  count?: number
  exp?: Date
}


export interface AvailableFeatureInterface {
  name: string
  description: string
  cost: number

  exp?: {
    delay: number
    scale: 'day' | 'week' | 'month' | 'shot'
  }
}

