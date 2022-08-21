import useUsersWithFilters from './useUsersWithFilters'
import UsersWithFiltersView from './UsersWithFiltersView'

interface props {
  readonly url:string
}

export default function UsersWithFilters({url}:props) {
  const props = useUsersWithFilters()

  return <UsersWithFiltersView {...props} url={url}/>
}
