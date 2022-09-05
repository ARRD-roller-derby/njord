import GoBackView from './GoBackView';
import useGoBack from './useGoBack';
export default function GoBack(){
  const props = useGoBack()
  return <GoBackView {...props}/>
}