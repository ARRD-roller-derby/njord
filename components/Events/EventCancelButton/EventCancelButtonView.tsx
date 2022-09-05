import AutoConfirmButton from '../../_ui/AutoConfirmButton/AutoConfirmButton';

interface Props {
  readonly deleteEvent: Function
  readonly loading: boolean
}

export default function EventCancelButtonView({ deleteEvent, loading }: Props) {
  return (
    <AutoConfirmButton
      loading={loading}
      textConfirm="Êtes-vous sûr ?"
      text="Annuler cette événnement"
      onClick={() => deleteEvent()}
    />
  )
}
