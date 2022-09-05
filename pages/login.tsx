import { getSession } from 'next-auth/react'
import Login from '../components/_pageRelated/Login/Login'

export default function LoginPage() {
  return <Login />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  return session
    ? {
        redirect: { destination: '/' },
      }
    : { props: { start: true } }
}
