import { getSession } from 'next-auth/react'
import Teams from '../components/_pageRelated/Teams/Teams'

export default function TeamsPage() {
  return <Teams/>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { start: true } }
}
