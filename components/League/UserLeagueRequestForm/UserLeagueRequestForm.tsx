import UserLeagueRequestFormView from "./UserLeagueRequestFormView";
import useUserLeagueRequestForm from "./useUserLeagueRequestForm";

interface props {
  readonly close:Function
}

export default function UserLeagueRequestForm({close}:props){
  const props= useUserLeagueRequestForm(close);
  return <UserLeagueRequestFormView {...props}/>
}