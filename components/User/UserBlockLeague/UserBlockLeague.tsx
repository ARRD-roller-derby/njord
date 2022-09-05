import { UserInterface } from '../../../types/User.interface'
import MiniForm from '../../MiniForm/MiniForm/MiniForm'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'
import MiniFormCreateSelect from '../../MiniForm/MiniFormCreateSelect/MiniFormCreateSelect'
import MiniFormArrayOfString from '../../MiniForm/MiniFormArrayOfString/MiniFormStringRead/MiniFormArrayOfString'
import MiniFormStringRead from '../../MiniForm/MiniFormString/MiniFormStringRead/MiniFormStringRead'
import MiniFormCheckboxEdit from '../../MiniForm/MiniFormCheckbox/MiniFormCheckboxEdit/MiniFormCheckboxEdit';

interface props {
  readonly user: UserInterface
  readonly uri: string
  readonly reSync: Function
}
export default function UserBlockLeague({ user, reSync, uri }: props) {
  return (
    <LabeledBlock title="League">
      <MiniForm
        onlyAdmin
        label="League"
        model={user}
        user={user}
        field="league"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormCheckboxEdit label={`exclure de la league`} />}
        readField={<span>{user?.league?.shortName || 'aucune league'}</span>}
      />
      <MiniForm
        onlyAdmin
        profiles={['bureau']}
        label="profils"
        model={user}
        user={user}
        field="profiles"
        uri={uri}
        reSync={reSync}
        editField={
          <MiniFormCreateSelect
            isMulti
            options={['bureau', 'coach', 'communication'].map((o) => ({
              label: o,
              value: o,
            }))}
          />
        }
        readField={<MiniFormArrayOfString />}
      />
    </LabeledBlock>
  )
}
