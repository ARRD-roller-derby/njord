import MyLeagueView from "./MyLeagueView";
import useMyLeague from './useMyLeague';

interface props {
  readonly canIRequest: boolean
}

export default function MyLeague({canIRequest}:props){
  const props = useMyLeague();
  return <MyLeagueView {...props } canIRequest={canIRequest}/>
}