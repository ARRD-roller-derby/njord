import { getSession } from 'next-auth/react'
import { Shop } from '../components/_pageRelated/shop/shop'

export default function ShopPage() {
  return <Shop />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
      redirect: { destination: '/login' },
    }
    : { props: { start: true } }
}
