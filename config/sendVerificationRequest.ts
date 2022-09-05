import { bifrost } from '../datasources/bifrost'

export default async function sendVerificationRequest({
  identifier: email,
  url,
}) {
  const { host } = new URL(url)

  bifrost.post('/sendVerifyMail', {
    url,
    host,
    email,
  })
  return true
}
