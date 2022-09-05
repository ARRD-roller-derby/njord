import classes from './UsersWithFilters.module.css'
import { UserInterface } from '../../../types/User.interface'
import InputWidthCross from '../../_ui/InputWidthCross/InputWidthCross'
import UserCard from '../UserCard/UserCard'
import UserPopin from '../UserPopin/UserPopin'
import UserLeagueRequest from '../../League/UserLeagueRequest/UserLeagueRequest'

interface props {
  readonly users: Array<UserInterface>
  readonly popin: undefined | UserInterface
  readonly openPopin: Function
  readonly closePopin: Function
  readonly setSearch: Function
  readonly reSync: Function
  readonly isAdmin: any
  readonly search: string
  readonly url:string
}

export default function UsersWithFiltersView({
  users,
  popin,
  openPopin,
  closePopin,
  setSearch,
  reSync,
  search,
  url
}: props) {
  return (
    <>
      <UserPopin setClose={closePopin} user={popin} reSync={reSync} url={url}/>
      <div className={classes.container}>
        <div className={classes.search}>
          <InputWidthCross
            value={search}
            setValue={setSearch}
            placeholder="Rechercher"
          />
        </div>
        <div className={classes.container}>
          <div className={classes.box}>
            <div className={classes.users}>
              {users.map((user: UserInterface) => (
                <UserCard user={user} key={user._id} openPopin={openPopin} url={url} />
              ))}
              {users.length === 0 && <UserLeagueRequest value={search}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
