import { UserInterface } from '../../../types/User.interface'
import MiniForm from '../../MiniForm/MiniForm/MiniForm'
import MiniFormStringEdit from '../../MiniForm/MiniFormString/MiniFormStringEdit/MiniFormStringEdit'
import MiniFormStringRead from '../../MiniForm/MiniFormString/MiniFormStringRead/MiniFormStringRead'

interface props {
  readonly user: UserInterface
  readonly uri: string
  readonly reSync: Function
}
export default function MeForm({ user, reSync, uri }: props) {
  return (
    <>
      <MiniForm
        label="prénom"
        user={user}
        field="name"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormStringEdit />}
        readField={<MiniFormStringRead />}
      />
      <MiniForm
        label="nom"
        user={user}
        field="lastname"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormStringEdit />}
        readField={<MiniFormStringRead />}
      />
    </>
  )
}
