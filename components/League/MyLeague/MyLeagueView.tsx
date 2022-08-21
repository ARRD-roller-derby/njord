import { LeagueInterface } from '../../../types/League.interface'
import UsersWithFilters from '../../User/UsersWithFilters/UsersWithFilters'
import FlexCol from '../../_ui/FlexCol/FlexCol'
import LeagueRequest from '../LeagueRequest/LeagueRequest'
import classes from './MyLeague.module.css'

interface props {
  readonly league: LeagueInterface
  readonly noLeague: boolean
  readonly canIRequest: boolean
}
export default function MyLeagueView({ league, noLeague, canIRequest }: props) {
  return (
    <div className={classes.container}>
      {noLeague && (
        <>
          <div className={classes.alert}>{"Vous n'avez pas de league"}</div>
          <LeagueRequest canIRequest={canIRequest} />
        </>
      )}

      {league && (
        <div className={classes.details}>
          <h2 className={classes.shortName}>{league.shortName}</h2>
          <h3 className={classes.name}>{league.name}</h3>
        </div>
      )}

      <div className={classes.users}>
        <UsersWithFilters url='/league'/>
      </div>
    </div>
  )
}
