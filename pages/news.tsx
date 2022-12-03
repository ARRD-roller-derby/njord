import { getSession } from 'next-auth/react'
import { News } from '../components/_pageRelated/News/News'

export default function NewsPage() {
  return <News />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
      redirect: { destination: '/login' },
    }
    : { props: { start: true } }
}
