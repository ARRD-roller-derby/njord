import UserLeagueRequestView from "./UserLeagueRequestView";
import useLeagueRequest from './useUserLeagueRequest';

export default function UserLeagueRequest(){
  const props = useLeagueRequest();
  return <UserLeagueRequestView {...props}/>
}