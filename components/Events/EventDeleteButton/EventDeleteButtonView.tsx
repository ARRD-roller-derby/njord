import AutoConfirmButton from '../../_ui/AutoConfirmButton/AutoConfirmButton';

interface Props {
  readonly deleteEvent: Function
  readonly loading: boolean
}

export default function EventDeleteButtonView({ deleteEvent, loading }: Props) {
  return (
    <AutoConfirmButton
      loading={loading}
      textConfirm="Êtes-vous sûr ?"
      text="Supprimer"
      onClick={() => deleteEvent()}
    />
  )
}
