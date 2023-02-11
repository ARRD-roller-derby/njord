import { getSession } from 'next-auth/react'
import Verify from '../components/_pageRelated/Verify/Verify'

export default function VerifyPage() {
  return <Verify />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  return session
    ? {
      redirect: { destination: '/' },
    }
    : { props: {} }
}
