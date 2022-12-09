import AutoConfirmButtonView from "./AutoConfirmButtonView";
import useAutoConfirmButton from "./useAutoConfirmButton";

interface Props {
  text: string
  textConfirm: string
  loading?: boolean
  onClick: Function
  isSpy?: boolean
}

export default function AutoConfirmButton(props: Props) {

  const useProps = useAutoConfirmButton(props)

  return <AutoConfirmButtonView {...props}{...useProps} />
}