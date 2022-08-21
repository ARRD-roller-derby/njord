import AddAddressPopin from "../AddAddressPopin/AddAddressPopin"


interface props {
  readonly isOpen: boolean
  readonly openPopin: Function
  readonly closePopin: Function
  readonly reSync:Function
}
export default function AddAddressButtonView({isOpen,openPopin,reSync,closePopin}:props) {

  return <>
  <button onClick={()=>openPopin()}>Ajouter une adresse</button>
  {isOpen && <AddAddressPopin closePopin={closePopin} reSync={reSync}/>}
  </>
}