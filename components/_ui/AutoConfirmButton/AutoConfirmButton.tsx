import AutoConfirmButtonView from "./AutoConfirmButtonView";
import useAutoConfirmButton from "./useAutoConfirmButton";

interface Props {
  readonly text: string
  readonly textConfirm: string
  readonly loading?: boolean
  readonly onClick:Function
}

export default function AutoConfirmButton(props:Props){

  const useProps = useAutoConfirmButton(props)

  return <AutoConfirmButtonView {...props }{...useProps}/>
}