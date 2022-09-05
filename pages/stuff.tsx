import { getSession } from 'next-auth/react'
import Stuff from '../components/_pageRelated/Stuff/Stuff'

export default function StuffPage() {
  return <Stuff />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { start: true } }
}
