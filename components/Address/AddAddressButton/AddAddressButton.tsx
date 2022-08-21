import AddAddressView from "./AddAddressButtonView";
import useAddAddress from "./useAddAddressButton";

interface Props {
  readonly reSync:Function
}

export default function AddAddressButton(props:Props){
  const useProps = useAddAddress()

  return <AddAddressView {...props} {...useProps}/>
}