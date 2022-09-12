import Factory from "../../_layouts/Factory/Factory"
import AddAddressButtonView from "./AddAddressButtonView"
import useAddAddressButton from "./useAddAddressButton"

interface Props {
  readonly reSync:Function
}

const AddAddressButton = Factory<Props>(useAddAddressButton,AddAddressButtonView)
export default AddAddressButton