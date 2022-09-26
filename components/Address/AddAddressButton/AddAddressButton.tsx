import Factory from "../../_layouts/Factory/Factory"
import AddAddressButtonView from "./AddAddressButtonView"
import useAddAddressButton from "./useAddAddressButton"
import { Props,useProps } from './AddAddressButton.type';

const AddAddressButton = Factory<Props,useProps>(useAddAddressButton,AddAddressButtonView)
export default AddAddressButton