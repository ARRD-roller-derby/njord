import Info from '../../_ui/Info/Info'
import SubmitButton from '../../_ui/SubmitButton/SubmitButton'
import classes from './ItemRecoveryButton.module.css'

interface Props {
  readonly handleClick: Function
  readonly inProgress: boolean
  readonly loading: boolean
  readonly IGotIt: boolean
  readonly isPlace: boolean
}
export default function ItemRecoveryButtonView({
  handleClick,
  inProgress,
  loading,
  IGotIt,
  isPlace
}: Props) {
  return (
    <div className={classes.container}>
      {(inProgress && !loading)  && <Info>votre demande de récupération est en cours</Info>}
      {(IGotIt && !loading )&& <Info>{'Vous êtes le porteur de cet objet'}</Info>}
      <SubmitButton
        loading={loading}
        disabled={inProgress || IGotIt}
        text="Récupérer"
        onClick={() => handleClick()}
      />
    </div>
  )
}
