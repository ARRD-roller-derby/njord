import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { UserInterface } from '../../../types/User.interface'
import useDBSync from '../../_hooks/useDBSync'
import { indexDB } from "../../../db/indexDB.connect";

export default function useMembre(id:string) {
  const { data: session } = useSession(),
    { data: users, reSync } = useDBSync('league/users', 'users'),
    [user, setUser] = useState<UserInterface>(),
    uri = '/users/updateField'

  useEffect(() => {
    if (session) getUser()
  }, [users, session])

  async function getUser() {
    if (!session.user?.league?.id) return
    const userDb = await indexDB.users.where({ _id: id }).first()
    setUser(userDb)
  }

  return { reSync, user, uri,isMe: user ? session.user._id === user?._id:false }
}
