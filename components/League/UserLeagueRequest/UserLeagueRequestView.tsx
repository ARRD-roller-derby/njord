import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import UserLeagueRequestForm from '../UserLeagueRequestForm/UserLeagueRequestForm'

interface props {
  readonly open: boolean
  readonly openModale: Function
  readonly closeModale: Function
  readonly isAdmin:boolean
}
export default function UserLeagueRequestView({
  open,
  openModale,
  closeModale,
  isAdmin
}: props) {
  return (isAdmin &&
    <>
      <button onClick={() => openModale()}>Inviter</button>
      {open && (
        <FullscreenModale setClose={() => closeModale()}>
          <UserLeagueRequestForm close={closeModale} />
        </FullscreenModale>
      )}
    </>
  )
}
