import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Error from '../../types/error.interface'
import { MiniLoaderContext } from '../mini-loader/mini-loader'

export default function useFetch<T>(
  url: string,
  body: object = {}
): {
  loading: boolean
  error: Error
  data: T
  refetch: (body?: Object) => void
  reSync: (body?: Object) => void
} {
  const [data, setData] = useState<T>(),
    [error, setError] = useState<Error>(),
    [loading, setLoading] = useState<boolean>(false),
    [globalLoading, setGlobalLoading] = useContext(MiniLoaderContext)

  async function handleFetch(newBody?: object, reSync?: boolean) {
    if (globalLoading) return
    setGlobalLoading(true)
    if (!reSync) setLoading(true)
    try {
      const { data: responseData } = await toast.promise(
        axios.post('/api/' + url, newBody || body),
        {
          error: {
            render({ data }) {
              return data?.response?.data || data.message || ''
            }
          }
        },
        { toastId: "fetch" }
      )
      setData(responseData)
    } catch (e) {
      setError(e)
    }
    if (!reSync) setLoading(false)
    setGlobalLoading(false)
  }

  useEffect(() => {
    //timeout for prevent preload page
    setTimeout(() => handleFetch(), 100)
  }, [])

  return {
    refetch: (newBody?: object) => handleFetch(newBody),
    //Resync not trigger Loading
    reSync: (newBody?: object) => handleFetch(newBody, true),
    data,
    error,
    loading,
  }
}
