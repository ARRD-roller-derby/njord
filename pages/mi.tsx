import { getSession } from 'next-auth/react'
import AuthentificatedTestLayout from '../components/_layouts/AuthentificatedTest/AuthentificatedTest';

export default function Miage() {
  return <AuthentificatedTestLayout>
    <p>Page de test</p>
  </AuthentificatedTestLayout>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { start: true } }
}
