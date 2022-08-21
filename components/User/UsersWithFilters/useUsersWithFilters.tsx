import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { UserInterface } from '../../../types/User.interface'
import useDBSync from '../../_hooks/useDBSync'
import useUsersFilter from '../../_hooks/useUsersFilter'

export default function useUsersWithFilters() {
  const { data: users, reSync } = useDBSync<Array<UserInterface>>('league/users', 'users'),
    { data: session } = useSession(),
    { search, setSearch, filteredUsers } = useUsersFilter(users),
    [popin, setPopin] = useState<undefined | UserInterface>(undefined)

  return {
    users: filteredUsers,
    popin,
    openPopin: (user: UserInterface) => setPopin(user),
    closePopin: () => setPopin(undefined),
    setSearch,
    isAdmin: session.isAdmin,
    reSync,
    search,
  }
}
