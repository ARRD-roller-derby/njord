import UserLeagueRequestFormView from "./UserLeagueRequestFormView";
import useUserLeagueRequestForm from "./useUserLeagueRequestForm";

interface props {
  readonly close:Function
  readonly defaultValue?:string
}

export default function UserLeagueRequestForm({close,defaultValue}:props){
  const props= useUserLeagueRequestForm(close,defaultValue);
  return <UserLeagueRequestFormView {...props}/>
}