import AddAddressButtonView from "./AddAddressButtonView"
import useAddAddressButton from "./useAddAddressButton"

interface Props {
  readonly reSync:Function
}

export default function AddAddressButton(props:Props){
  const useProps = useAddAddressButton()

  return <AddAddressButtonView {...props} {...useProps}/>
}