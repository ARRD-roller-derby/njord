import AutoConfirmButton from '../../_ui/AutoConfirmButton/AutoConfirmButton'

interface Props {
  readonly loading: boolean
  readonly deleteNews: Function
}

export default function NewsDeleteButtonView({loading,deleteNews}:Props) {
  return (
    <AutoConfirmButton
      text="Supprimer cette news"
      textConfirm="Je supprime !"
      loading={loading}
      onClick={deleteNews}
    />
  )
}
