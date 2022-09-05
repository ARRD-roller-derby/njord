import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useSilentFetch<T>(url: string): {
  fetch: Function
  data?: T
} {
  const [data, setData] = useState()

  async function fetch() {
    const { data: resData } = await axios.post('/api/' + url)
    setData(resData)
  }

  useEffect(() => {
    fetch()
  }, [])

  return { fetch, data }
}
