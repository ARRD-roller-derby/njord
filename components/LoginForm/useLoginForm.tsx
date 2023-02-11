import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import { LocalStorage } from '../../types/local-storage.enum';
import useLocalState from '../_hooks/useLocalState';
import usePost from '../_hooks/usePost';
export default function useLoginForm() {
  const { post, data } = usePost('users/create_login_token');
  const { setLocalState } = useLocalState({ verify: uuidv4() }, LocalStorage.verify);
  const [email, setEmail] = useState('')

  function handleSubmit(e?: React.SyntheticEvent) {
    e?.preventDefault()
    if (!email) {
      toast.error('Il faut renseigner un email valide.')
    } else {
      post({ email })
    }
  }

  useEffect(() => {
    if (data?.token) {
      setLocalState({ verify: data.token })
      signIn('email', { email })
    }
  }, [data])

  return { email, setEmail, submit: handleSubmit }
}
