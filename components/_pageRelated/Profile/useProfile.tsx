import { useSession } from 'next-auth/react'
import useDBSync from '../../_hooks/useDBSync'
import { UserInterface } from '../../../types/User.interface'
import { useEffect, useState } from 'react'
import { indexDB } from '../../../db/indexDB.connect'

export default function useProfile() {
  const uri = '/users/updateMyField',
    { data: session } = useSession(),
    { data: users, reSync } = useDBSync('league/users', 'users'),
    [me, setMe] = useState<UserInterface>()

  useEffect(() => {
    if (session) getMe()
  }, [users,session])

  async function getMe() {
    const myProfile = await indexDB.users
      .where({ _id: session.user._id })
      .first()
    if(myProfile) setMe(myProfile)
  }

  return { uri, me, setMe, reSync }
}
