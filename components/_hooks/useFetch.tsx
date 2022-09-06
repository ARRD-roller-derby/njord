import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Error from '../../types/error.interface'

export default function useFetch<T>(
  url: string,
  body: object = {}
): {
  readonly loading: boolean
  readonly error: Error
  readonly data: T
  readonly refetch: Function
} {
  const [data, setData] = useState<T>(),
    [error, setError] = useState<Error>(),
    [loading, setLoading] = useState<boolean>(false)

  async function handleFetch(newBody?: object) {
    setLoading(true)
    try {
      const { data: responseData } = await toast.promise(
        axios.post('/api/' + url, newBody || body),
        {
          pending: {render:<p>{'chargement...'}</p>},
          error: {
            render({data}){
              return data?.response?.data || data.message
            }
          }
        },
        { toastId: "fetch" }
      )
      setData(responseData)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    //timeout for prevent preload page
    setTimeout(()=>handleFetch(),100)
  }, [])

  return {
    refetch: handleFetch,
    data,
    error,
    loading,
  }
}
