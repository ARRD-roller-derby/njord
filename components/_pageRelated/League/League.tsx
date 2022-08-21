import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated';
import PendingRequestIndicator from '../../PendingRequestIndicator/PendingRequestIndicator';
import MyLeague from '../../League/MyLeague/MyLeague';
import useLeague from './useLeague';

export default function League(){
  const {canIRequest,setCanIRequest} = useLeague();

  return <AuthentificatedLayout>
    <PendingRequestIndicator setCanIRequest={setCanIRequest} />
    <MyLeague canIRequest={canIRequest}/>
  </AuthentificatedLayout>
}