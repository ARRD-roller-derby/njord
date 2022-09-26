import AddAddressPopin from '../AddAddressPopin/AddAddressPopin'
import { Props, useProps } from './AddAddressButton.type'

const AddAddressButtonView = ({
  isOpen,
  openPopin,
  reSync,
  closePopin,
}: Props & useProps) => {
  return (
    <>
      <button onClick={() => openPopin()}>Ajouter une adresse</button>
      {isOpen && <AddAddressPopin closePopin={closePopin} reSync={reSync} />}
    </>
  )
}

export default AddAddressButtonView