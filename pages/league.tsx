import { getSession } from 'next-auth/react'
import League from '../components/_pageRelated/League/League'

export default function LeaguePage() {
  return <League />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { start: true } }
}
