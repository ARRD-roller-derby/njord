import AutoConfirmButton from '../../_ui/AutoConfirmButton/AutoConfirmButton';

interface Props {
  readonly deleteEvent: Function
  readonly loading: boolean
}

export default function EventCancelButtonView({ deleteEvent, loading }: Props) {
  return (
    <AutoConfirmButton
      loading={loading}
      textConfirm="confirmer"
      text="Annuler cette événement"
      onClick={() => deleteEvent()}
    />
  )
}
