import { getSession } from "next-auth/react"
import { Ranking } from "../components/_pageRelated/Ranking/ranking"

export default function ClassementPage() {
  return <Ranking />
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  return !session
    ? {
      redirect: { destination: '/login' },
    }
    : { props: { start: true } }
}
