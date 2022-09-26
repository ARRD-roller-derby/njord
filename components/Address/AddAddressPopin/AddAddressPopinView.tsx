import classes from './AddAddressPopin.module.css'
import MiniFormAddressEdit from '../../MiniForm/MiniFormAddress/MiniFormAddressEdit/MiniFormAddressEdit'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'
import { Props, useProps } from './AddAddressPopin.type'

const AddAddressPopinView = ({
  closePopin,
  submit,
  setAddress,
  loading,
}: Props & useProps) => {
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
            <button disabled={loading} type="submit" onClick={() => submit()}>
              ajouter
            </button>
          </div>
        </div>
      </LabeledBlock>
    </FullscreenModale>
  )
}

export default AddAddressPopinView