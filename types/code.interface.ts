export interface ICode {
  _id: string
  email: string
  code: string
  url: string
  token: string
  numberTry: number
  verifyKey: string
  updatedAt: Date
  expiresAt: Date
}