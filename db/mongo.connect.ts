import mongoose from 'mongoose'

const connectMongo = async () => mongoose.connect(process.env.MONGO_URI)

declare global {
  var MongoDb: any | undefined
}

export const MongoDb = global.mongo || connectMongo
if (process.env.NODE_ENV !== 'production') MongoDb.mongo = connectMongo
