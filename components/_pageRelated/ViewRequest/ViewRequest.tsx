import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated';
import useViewRequest from './useViewRequest';
import ViewRequestView from './ViewRequestView';

interface props {
  readonly token:string
}

export default function ViewRequest({token}:props){
const props = useViewRequest(token)
  return <AuthentificatedLayout>
    <ViewRequestView {...props}/>
  </AuthentificatedLayout>
}