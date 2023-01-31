import { getSession } from 'next-auth/react'
import { Sponsors } from '../components/_pageRelated/sponsors/sponsors'

export default function LeaguePage() {
  return <Sponsors />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
      redirect: { destination: '/login' },
    }
    : { props: { start: true } }
}
