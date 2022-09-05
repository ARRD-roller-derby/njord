import { useState } from 'react'
import { UserInterface } from '../../types/User.interface'

interface FuncReturn {
  readonly filteredUsers: Array<UserInterface>
  readonly search: string
  readonly setSearch: Function
}

export default function useUsersFilter(
  users: Array<UserInterface>
): FuncReturn {
  const [search, setSearch] = useState<string>('')

  function filterUser(user: UserInterface) {
    let count = 0
    const fields = ['name', 'lastname', 'email', 'derbyName', 'numRoster']

    fields.forEach((field) => {
      if (user[field]) {
        if (user[field].toLowerCase().includes(search.toLocaleLowerCase())) {
          count++
        }
      }
    })

    if (user.league) {
      if (
        user.league.shortName.toLowerCase().includes(search.toLocaleLowerCase())
      ) {
        count++
      }
    }

    if (user.profiles) {
      if (
        user.profiles.find((profile) =>
          profile.toLowerCase().includes(search.toLocaleLowerCase())
        )
      ) {
        count++
      }
    }

    if (user.teams) {
      if (
        user.teams.find((team) =>
          team.toLowerCase().includes(search.toLocaleLowerCase())
        )
      ) {
        count++
      }
    }

    return count
  }
  return {
    filteredUsers: users ? users.filter(filterUser) : [],
    search,
    setSearch,
  }
}
