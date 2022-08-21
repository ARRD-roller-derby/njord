import usePost from '../../_hooks/usePost'
import { useEffect } from 'react'
import { RequestInterface } from '../../../types/Request.interface'
import { answerRequest } from '../../../types/answerRequest.enum'

export default function useRequestMiniCard(
  request: RequestInterface,
  reSync: Function
) {
  const { data, post,loading } = usePost('requests/answer')

  function answerPost(answer: answerRequest) {
    post({ token: request.token, answer })
  }

  useEffect(() => {
    if (data) {
      reSync()
    }
  }, [data])

  return { answerPost,loading }
}
