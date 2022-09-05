import { getSession } from 'next-auth/react'
import Calendar from '../components/_pageRelated/Calendar/Calendar';

export default function CalendarPage() {
  return <Calendar/>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { start: true } }
}
