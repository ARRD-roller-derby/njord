import useFetch from '../../_hooks/useFetch'

export default function useAnswerRequest(token: string,answer:string) {
  const { data, loading,error } = useFetch<string>('requests/answer',{token,answer})

  return { message:data, loading, error: error?.response?.data }
}
