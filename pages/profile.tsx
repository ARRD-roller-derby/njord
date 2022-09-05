import { getSession } from 'next-auth/react'
import Profile from '../components/_pageRelated/Profile/Profile'

export default function ProfilePage() {
  return <Profile />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { start: true } }
}
