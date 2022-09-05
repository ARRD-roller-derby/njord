import MiniFormAddressEditView from './MiniFormAddressEditView'
import useMiniFormAddressEdit from './useMiniFormAddressEdit';

interface props {
  readonly setValue?: Function
  readonly onlyPersonal?: boolean
}
export default function MiniFormAddressEdit({setValue,onlyPersonal }: props) {
const useProps = useMiniFormAddressEdit(setValue);

  return <MiniFormAddressEditView {...useProps} onlyPersonal={onlyPersonal}/>
}