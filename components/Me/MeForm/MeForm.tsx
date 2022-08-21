import { UserInterface } from '../../../types/User.interface'
import MiniForm from '../../MiniForm/MiniForm/MiniForm'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'
import MiniFormStringEdit from '../../MiniForm/MiniFormString/MiniFormStringEdit/MiniFormStringEdit'
import MiniFormStringRead from '../../MiniForm/MiniFormString/MiniFormStringRead/MiniFormStringRead'
import MiniFormSelect from '../../MiniForm/MiniFormSelect/MiniFormSelect'
import { Pronoun } from '../../../types/Pronoun.enum'
import MiniFormDateRead from '../../MiniForm/MiniFormDate/MiniFormDateRead/MiniFormDateRead';
import MiniFormDateEdit from '../../MiniForm/MiniFormDate/MiniFormDateEdit/MiniFormDate'

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
