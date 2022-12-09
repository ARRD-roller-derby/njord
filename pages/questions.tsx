import { getSession } from 'next-auth/react'
import { Questions } from '../components/_pageRelated/questions/questions'

export default function LeaguePage() {
  return <Questions />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session?.isAdmin
    ? {
      redirect: { destination: '/login' },
    }
    : { props: { start: true } }
}
