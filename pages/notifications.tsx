import { getSession } from 'next-auth/react'
import { Notifications } from '../components/_pageRelated/notifications/notifications'

export default function NotificationsPage() {
  return <Notifications />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
      redirect: { destination: '/login' },
    }
    : { props: { start: true } }
}
