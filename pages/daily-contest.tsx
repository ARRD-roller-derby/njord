import { getSession } from 'next-auth/react'
import { DailyContest } from '../components/_pageRelated/daily-contest/daily-contest';

export default function DailyContextPage() {
  return <DailyContest />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
      redirect: { destination: '/login' },
    }
    : { props: { start: true } }
}
