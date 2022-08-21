import classes from './AddAddressPopin.module.css'
import MiniFormAddressEdit from '../../MiniForm/MiniFormAddress/MiniFormAddressEdit/MiniFormAddressEdit'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'

interface Props {
  readonly closePopin: Function
  readonly setAddress: Function
  readonly submit: Function
  readonly loading:boolean
}

export default function AddAddressPopinView({ closePopin, submit,setAddress,loading }: Props) {
  return (
    <FullscreenModale setClose={() => closePopin()}>
      <LabeledBlock title="Ajouter une adresse">
        <div className={classes.container}>
          <MiniFormAddressEdit setValue={setAddress} />

          <div className={classes.buttons}>
            <button
              disabled={loading}
              type="reset"
              onClick={() => closePopin()}
            >
              annuler
            </button>
            <button disabled={loading} type="submit" onClick={()=>submit()}>ajouter</button>
          </div>
        </div>
      </LabeledBlock>
    </FullscreenModale>
  )
}
