import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'

export default function useLoginForm() {
  const [email, setEmail] = useState('')

  function handleSubmit(e?: React.SyntheticEvent) {
    e?.preventDefault()
    if (!email) {
      toast.error('Il faut renseigner un email valide.')
    } else {
      signIn('email', { email })
    }
  }

  return {email,setEmail,submit:handleSubmit}
}
