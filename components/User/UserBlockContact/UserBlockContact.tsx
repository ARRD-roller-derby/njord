import { UserInterface } from '../../../types/User.interface'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'
import { useSession } from 'next-auth/react'
import MiniForm from '../../MiniForm/MiniForm/MiniForm'
import MiniFormStringRead from '../../MiniForm/MiniFormString/MiniFormStringRead/MiniFormStringRead'
import MiniFormStringEdit from '../../MiniForm/MiniFormString/MiniFormStringEdit/MiniFormStringEdit'

interface props {
  readonly user: UserInterface
  readonly uri: string
  readonly reSync: Function
}
export default function UserBlockContact({ user, reSync, uri }: props) {

  return (
    <LabeledBlock title="coordonées">
      <MiniForm
        label="email"
        model={user}
        user={user}
        field="email"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormStringEdit />}
        readField={<MiniFormStringRead />}
      />
      <MiniForm
        label="mobile"
        model={user}
        user={user}
        field="phone"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormStringEdit />}
        readField={<MiniFormStringRead />}
      />
    </LabeledBlock>
  )
}
