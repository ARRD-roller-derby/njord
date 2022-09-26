import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

const connectMongo = async () =>
  mongoose.connect(
    process.env.NODE_ENV === 'test'
      ? globalThis.__MONGO_URI__
      : process.env.MONGO_URI
  )

declare global {
  var MongoDb: any | undefined
}

export const MongoDb = global.mongo || connectMongo

if (process.env.NODE_ENV !== 'production') MongoDb.mongo = connectMongo
