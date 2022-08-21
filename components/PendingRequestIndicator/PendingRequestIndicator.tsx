import PendingRequestIndicatorView from './PendingRequestIndicatorView';
import usePendingRequestIndicator from './usePendingRequestIndicator';

interface props{
  readonly setCanIRequest: Function
}
export default function PendingRequestIndicator({setCanIRequest}:props) {
  const request = usePendingRequestIndicator(setCanIRequest);
  return <PendingRequestIndicatorView request={request}/>
}
