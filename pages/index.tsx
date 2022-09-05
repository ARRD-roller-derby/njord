import { getSession } from 'next-auth/react'
import Home from '../components/_pageRelated/Home/Home'

export default function HomePage() {
  return <Home />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { session } }
}
