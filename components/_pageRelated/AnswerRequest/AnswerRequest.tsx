import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated';
import useViewRequest from './useAnswerRequest';
import AnswerRequestView from './AnswerRequestView';

interface props {
  readonly token:string
  readonly answer:string
}

export default function AnswerRequest({token, answer}:props){
const props = useViewRequest(token,answer)
  return <AuthentificatedLayout>
    <AnswerRequestView {...props}/>
  </AuthentificatedLayout>
}