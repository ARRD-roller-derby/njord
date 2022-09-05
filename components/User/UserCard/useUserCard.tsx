import { UserInterface } from '../../../types/User.interface'
import { useRouter } from 'next/router'

export default function useUserCard(user: UserInterface, openPopin: Function, url:string) {
  const router = useRouter()

  function handleClick() {
    openPopin(user)
    router.push(url, '/user/' + user._id, { shallow: true })
  }

  return handleClick
}
