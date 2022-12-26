import { Schema, model, models } from 'mongoose'
import { Wallet_logInterface } from '../types/wallet_log.interface'

const wallet_logSchema = new Schema<Wallet_logInterface>({
  userId: String,
  text: String,
  date: Date,
}),
  Wallet_log =
    models.wallet_log || model('wallet_log', wallet_logSchema)


export default Wallet_log
