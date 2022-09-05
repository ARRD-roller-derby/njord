import { getSession } from 'next-auth/react'
import AnswerRequest from '../../../components/_pageRelated/AnswerRequest/AnswerRequest'

interface props {
  readonly token: string
  readonly answer: string
}

export default function RequestAnswerPage({ token,answer }: props) {
  return <AnswerRequest token={token} answer={answer}/>
}

export async function getServerSideProps({ req, params }) {
  const session = await getSession({ req })
  return !session
    ? {
        redirect: { destination: '/login' },
      }
    : { props: { token: params.token,answer: params.answer } }
}
