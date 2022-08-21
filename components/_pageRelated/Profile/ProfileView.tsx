import UserBlockIndentity from '../../User/UserBlockIndentity/UserBlockIndentity';
import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated';
import classes from './Profile.module.css';
import { UserInterface } from '../../../types/User.interface';
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel';
import UserBlockContact from '../../User/UserBlockContact/UserBlockContact';
import UserBlockDerby from '../../User/UserBlockDerby/UserBlockDerby';
import UserBlockLeague from '../../User/UserBlockLeague/UserBlockLeague';
import LeagueRequest from '../../League/LeagueRequest/LeagueRequest';

interface props {
  readonly uri:string
  readonly reSync: Function
  readonly me: UserInterface
}
export default function ProfileView({uri,me,reSync}:props){

  return <AuthentificatedLayout>
     {me ? <div className={classes.container}>
      <div className={classes.box}>
      <UserBlockIndentity  reSync={reSync} user={me} uri={uri}/>
      <UserBlockContact reSync={reSync} user={me} uri={uri}/>
      <UserBlockDerby reSync={reSync} user={me} uri={uri}/>
      <UserBlockLeague reSync={reSync} user={me} uri={uri}/>
      <LeagueRequest canIRequest={true} />
      </div>
    </div>:  <div className={classes.container}><LoaderWheel/></div>}
  </AuthentificatedLayout>
}