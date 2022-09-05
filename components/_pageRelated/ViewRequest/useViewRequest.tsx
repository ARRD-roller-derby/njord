import { answerRequest } from '../../../types/answerRequest.enum'
import useFetch from '../../_hooks/useFetch'
import { useRouter } from 'next/router'
import { RequestInterface } from '../../../types/Request.interface'

export default function useViewRequest(token: string) {
  const {
      data: request,
      loading,
      error,
    } = useFetch<RequestInterface>('requests/request', { token }),
    router = useRouter()

  function answerPost(answer: answerRequest) {
    router.push('/request/' + answer + '/' + token)
  }

  return { request, answerPost, loading, error: error?.response?.data }
}
