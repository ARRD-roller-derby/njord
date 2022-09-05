import MiniFormHourEditView from "./MiniFormHourEditView";
import useMiniFormHourEdit from './useMiniFormHourEdit';

interface props {
  readonly value?: string
  readonly setValue?: Function
}

export default function MiniFormHourEdit(props:props){

  const useProps = useMiniFormHourEdit(props)

  return <MiniFormHourEditView {...useProps} />
}