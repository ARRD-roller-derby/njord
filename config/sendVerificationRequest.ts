import axios from 'axios'
import { bifrost } from '../datasources/bifrost'

export default async function sendVerificationRequest({
  identifier: email,
  url,
}) {
  const { host, protocol } = new URL(url)
  const { data } = await axios.post(`${protocol}//${host}/api/users/login`, { email, url })

  bifrost.post('/send_login_code', {
    url,
    host,
    email,
    code: data,
  })
  return true
}
