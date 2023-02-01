import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import useIsOnline from './online.hook'
import { indexDB } from '../../db/indexDB.connect'
import Error from '../../types/error.interface'
import { MiniLoaderContext } from '../mini-loader/mini-loader'

export default function useDBSync<T>(
  url: string,
  dbField: string,
  body: Object = {}
): {
  data: T
  error: Error
  reSync: Function
} {
  const isOnline = useIsOnline(),
    [data, setData] = useState<T>(),
    [error, setError] = useState<Error>(),
    [_globalLoading, setGlobalLoading] = useContext(MiniLoaderContext)

  async function handleFetch(newBody?: object) {
    setGlobalLoading(true)
    try {
      const { data: resData } = await toast.promise(
        axios.post('/api/' + url, newBody || body),
        {
          error: {
            render({ data }) {
              return data?.response?.data || data.message
            }
          }
        },
        { toastId: 'synchro' }
      )

      if (JSON.stringify(resData) === JSON.stringify(data)) return
      await indexDB[dbField].clear()

      for (const item of resData) {
        await indexDB[dbField].add(item)
      }
      setData(resData)
    } catch (e) {
      setError(e)
    }
    setGlobalLoading(false)
  }

  async function getIdB() {
    const idbCache = await indexDB[dbField].toArray()
    if (idbCache.length > 0) {
      setData(idbCache)
    }
  }

  useEffect(() => {
    getIdB()
  }, [])

  useEffect(() => {
    if (isOnline) {
      handleFetch()
    }
  }, [isOnline])

  return {
    data,
    error,
    reSync: handleFetch,
  }
}
