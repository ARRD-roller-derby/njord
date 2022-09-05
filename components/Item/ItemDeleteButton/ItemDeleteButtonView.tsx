import AutoConfirmButton from '../../_ui/AutoConfirmButton/AutoConfirmButton';
import classes from './ItemDeleteButton.module.css';

interface Props {
  readonly deleteItem: Function
  readonly loading:boolean
}
export default function ItemDeleteButtonView({deleteItem,loading}:Props){

  return <div className={classes.delete}>
    <AutoConfirmButton onClick={()=>deleteItem()} text="Supprimer l'objet" textConfirm='Confirmer' loading={loading}/>
  </div>
}