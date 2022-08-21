import { getSession } from 'next-auth/react'
import Membre from '../../components/_pageRelated/Membre/Membre'

interface props {
  readonly id: string
}
export default function MembrePage({ id }: props) {
  return <Membre id={id} />
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req })

  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { id: params.id } }
}
