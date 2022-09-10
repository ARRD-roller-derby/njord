import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { UserInterface } from '../../../types/User.interface'

export default function useUserPopin(setClose: Function,url:string='/users',user:UserInterface) {
  const router = useRouter(),
    uri = '/users/updateField',
    {data:session} = useSession()

  function handleClose() {
    router.push(url, url, { shallow: true })
    setClose()
  }

  return { close: handleClose, uri, isMe : user?._id === session.user._id}
}
