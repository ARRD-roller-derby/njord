import { UserInterface } from '../../../types/User.interface'
import MiniForm from '../../MiniForm/MiniForm/MiniForm'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'
import MiniFormStringEdit from '../../MiniForm/MiniFormString/MiniFormStringEdit/MiniFormStringEdit'
import MiniFormStringRead from '../../MiniForm/MiniFormString/MiniFormStringRead/MiniFormStringRead'
import MiniFormSelect from '../../MiniForm/MiniFormSelect/MiniFormSelect'
import { Pronoun } from '../../../types/Pronoun.enum'
import MiniFormDateRead from '../../MiniForm/MiniFormDate/MiniFormDateRead/MiniFormDateRead';
import MiniFormDateEdit from '../../MiniForm/MiniFormDate/MiniFormDateEdit/MiniFormDateEdit'

interface props {
  readonly user: UserInterface
  readonly uri: string
  readonly reSync: Function
}
export default function UserBlockIndentity({ user, reSync, uri }: props) {
  return (
    <LabeledBlock title="identité">
      <MiniForm
        label="prénom"
        model={user}
        user={user}
        field="name"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormStringEdit />}
        readField={<MiniFormStringRead />}
      />
      <MiniForm
        label="nom"
        model={user}
        user={user}
        field="lastname"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormStringEdit />}
        readField={<MiniFormStringRead />}
      />
      <MiniForm
        label="pronom"
        model={user}
        user={user}
        field="pronoun"
        uri={uri}
        reSync={reSync}
        editField={
          <MiniFormSelect
            options={[
              { label: 'elle', value: Pronoun.ELLE },
              { label: 'iel', value: Pronoun.IEL },
              { label: 'il', value: Pronoun.IL },
            ]}
          />
        }
        readField={<MiniFormStringRead />}
      />
      <MiniForm
        label="Date de naissance"
        model={user}
        user={user}
        field="birthDate"
        uri={uri}
        profiles={['admin', 'bureau']}
        reSync={reSync}
        editField={<MiniFormDateEdit />}
        readField={<MiniFormDateRead />}
      />
    </LabeledBlock>
  )
}
