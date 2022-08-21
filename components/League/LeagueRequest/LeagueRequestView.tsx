import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import LeagueRequestForm from '../LeagueRequestForm/LeagueRequestForm'

interface props {
  readonly open: boolean
  readonly openModale: Function
  readonly closeModale: Function
  readonly canIRequest: boolean
}
export default function LeagueRequestView({
  open,
  openModale,
  closeModale,
  canIRequest,
}: props) {
  return (
    <>
      <button onClick={() => openModale()}>Rejoindre une league</button>
      {open && (
        <FullscreenModale setClose={() => closeModale()}>
          {canIRequest ? (
            <LeagueRequestForm close={closeModale} />
          ) : (
            <p>
              Vous ne pouvez pas envoyer plusieurs requête dans un délai aussi
              court.
            </p>
          )}
        </FullscreenModale>
      )}
    </>
  )
}
