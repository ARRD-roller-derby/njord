export interface ICode {
  _id: string
  email: string
  code: string
  url: string
  token: string
  verifyKey: string
  updatedAt: Date
  expiresAt: Date
}