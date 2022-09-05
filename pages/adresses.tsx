import { getSession } from 'next-auth/react'
import Adresses from '../components/_pageRelated/Adresses/Adresses'

export default function AdressesPage() {
  return <Adresses />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { start: true } }
}
