import MiniFormAddressSearchView from './MiniFormAddressSearchView';
import useMiniFormAddressSearch from './useMiniFormAddressSearch';

interface props {
  readonly setValue?: Function
  readonly withSaveAddresses?:boolean
}

export default function MiniFormAddressSearch({setValue,withSaveAddresses}: props) {
const useProps = useMiniFormAddressSearch(setValue,withSaveAddresses);
  return <MiniFormAddressSearchView {...useProps}/>
}