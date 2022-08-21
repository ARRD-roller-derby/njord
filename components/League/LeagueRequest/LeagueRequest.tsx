import LeagueRequestView from "./LeagueRequestView";
import useLeagueRequest from './useLeagueRequest';

interface props {
  readonly canIRequest:boolean
}

export default function LeagueRequest({canIRequest}:props){
  const props = useLeagueRequest();
  return <LeagueRequestView {...props} canIRequest={canIRequest}/>
}