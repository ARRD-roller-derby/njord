import UserLeagueRequestView from "./UserLeagueRequestView";
import useLeagueRequest from './useUserLeagueRequest';

interface Props {
  readonly value?:string
}
export default function UserLeagueRequest(props:Props){
  const useProps = useLeagueRequest();
  return <UserLeagueRequestView {...props} {...useProps}/>
}