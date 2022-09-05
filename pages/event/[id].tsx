import { getSession } from 'next-auth/react'
import Event from '../../components/_pageRelated/Event/Event'

interface props {
  readonly id: string
}
export default function EventPage({ id }: props) {
  return <Event id={id} />
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req })

  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { id: params.id } }
}
