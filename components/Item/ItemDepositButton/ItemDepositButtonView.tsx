import Info from '../../_ui/Info/Info'
import SubmitButton from '../../_ui/SubmitButton/SubmitButton';
import classes from './ItemDepositButton.module.css'
import MiniFormAddressSearch from '../../MiniForm/MiniFormAddress/MiniFormAddressSearch/MiniFormAddressEdit'
import MiniFormCheckboxEdit from '../../MiniForm/MiniFormCheckbox/MiniFormCheckboxEdit/MiniFormCheckboxEdit'

interface Props {
  readonly handleClick: Function
  readonly inProgress: boolean
  readonly loading: boolean
  readonly IGotIt: boolean
  readonly show: boolean
  readonly setShow: Function
  readonly address: string
  readonly addressToString:Function
}

export default function ItemDepositButtonView({
  handleClick,
  inProgress,
  loading,
  IGotIt,
  show,
  setShow,
  address,
  addressToString,
}: Props) {

  return IGotIt && !inProgress ? (
    <div className={classes.container} data-inprogress={inProgress}>
      <MiniFormCheckboxEdit label="Déposer l'objet" setValue={setShow} value={show} />
      {show && (
        <>
        <MiniFormAddressSearch
          setValue={(addr: object) => addressToString(addr)}
          withSaveAddresses
        />
        <SubmitButton
        loading={loading}
        disabled={!address || loading}
        text="Déposer"
        onClick={() => handleClick()}
      />
      </>
      )}
    </div>
  ) : (
    <></>
  )
}
