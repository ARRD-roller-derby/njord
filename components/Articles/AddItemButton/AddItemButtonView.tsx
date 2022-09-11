import AddItemPopin from "../../Item/AddItemPopin/AddItemPopin"

interface props {
  readonly isOpen: boolean
  readonly openPopin: Function
  readonly closePopin: Function
  readonly reSync:Function
}
export default function AddItemButtonView({isOpen,openPopin,reSync,closePopin}:props) {

  return <>
  <button onClick={()=>openPopin()}>Ajouter un objet</button>
  {isOpen && <AddItemPopin closePopin={closePopin} reSync={reSync}/>}
  </>
}