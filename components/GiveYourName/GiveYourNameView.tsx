import MeForm from '../Me/MeForm/MeForm'
import FlexCol from '../_ui/FlexCol/FlexCol'
import FullscreenModale from '../_ui/FullscreenModale/FullscreenModale'
import Info from '../_ui/Info/Info'
import { UserInterface } from '../../types/User.interface'

interface props {
  readonly open: boolean
  readonly close: Function
  readonly fetch: Function
  readonly user: UserInterface
}

export default function GiveYourNameView({ open, close, user, fetch }: props) {
  return (
    open && (
      <FullscreenModale setClose={() => close()}>
        <FlexCol>
          <MeForm user={user} reSync={fetch} uri="/users/updateMyField" />
          <Info>
            Pour améliorer votre navigation, vous êtes invité à indiquer les
            informations suivantes
          </Info>
        </FlexCol>
      </FullscreenModale>
    )
  )
}
