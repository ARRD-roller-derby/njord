import { useState, useEffect } from 'react'
import usePost from '../../_hooks/usePost'
import { useRouter } from 'next/router'

interface props {
  readonly setClose: Function
  readonly defaultValue: string
  readonly reSync: Function
}

export default function useUserAddForm({ setClose, reSync, defaultValue }: props) {
  const { post, loading, data } = usePost('/users/add'),
    router = useRouter(),
    [email, setEmail] = useState<string>(defaultValue)

  function handleSubmit(e:React.SyntheticEvent) {
    e.preventDefault()
    post({ email })
  }

  useEffect(() => {
    if (data) {
      router.push('/membres', '/membre/' + data._id, { shallow: true })
      setClose(data)
      reSync()
    }
  }, [data])

  return {email,submit: handleSubmit,loading,setEmail}
}
