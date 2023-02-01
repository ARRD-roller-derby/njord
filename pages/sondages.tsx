import { getSession } from 'next-auth/react'
import { Polls } from '../components/_pageRelated/polls/polls'

export default function SondagesPage() {
  return <Polls />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
      redirect: { destination: '/login' },
    }
    : { props: { start: true } }
}
