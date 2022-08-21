import LeagueRequestFormView from "./LeagueRequestFormView";
import useLeagueRequestForm from "./useLeagueRequestForm";

interface props {
  readonly close:Function
}
export default function LeagueRequestForm({close}:props){
  const props= useLeagueRequestForm(close);
  return <LeagueRequestFormView {...props}/>
}