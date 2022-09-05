import { getSession } from 'next-auth/react'
import ViewRequest from '../../../components/_pageRelated/ViewRequest/ViewRequest'

interface props {
  readonly token: string
}
export default function RequestViewPage({ token }: props) {
  return <ViewRequest token={token} />
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { token: params.token } }
}
