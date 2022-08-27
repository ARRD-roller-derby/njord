import { UserInterface } from '../../../types/User.interface'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'
import MiniForm from '../../MiniForm/MiniForm/MiniForm'
import MiniFormStringEdit from '../../MiniForm/MiniFormString/MiniFormStringEdit/MiniFormStringEdit'
import MiniFormStringRead from '../../MiniForm/MiniFormString/MiniFormStringRead/MiniFormStringRead'
import MiniFormCheckboxEdit from '../../MiniForm/MiniFormCheckbox/MiniFormCheckboxEdit/MiniFormCheckboxEdit'
import MiniFormChechboxRead from '../../MiniForm/MiniFormCheckbox/MiniFormCheckboxRead/MiniFormCheckboxRead'

interface props {
  readonly user: UserInterface
  readonly uri: string
  readonly reSync: Function
}
export default function UserBlockDerby({ user, reSync, uri }: props) {
  return (
    <LabeledBlock title="Derby">
      <MiniForm
        label="n° de licence"
        model={user}
        user={user}
        field="numLicence"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormStringEdit />}
        readField={<MiniFormStringRead />}
      />
      <MiniForm
        label="derby name"
        model={user}
        user={user}
        field="derbyName"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormStringEdit />}
        readField={<MiniFormStringRead />}
      />

      <MiniForm
        label="n° roster"
        model={user}
        user={user}
        field="numRoster"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormStringEdit />}
        readField={<MiniFormStringRead />}
      />
      <MiniForm
        label="MSP"
        model={user}
        user={user}
        field="msp"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormCheckboxEdit />}
        readField={<MiniFormChechboxRead />}
        onlyAdmin
      />
      <MiniForm
        label="MST"
        model={user}
        user={user}
        field="mst"
        uri={uri}
        reSync={reSync}
        editField={<MiniFormCheckboxEdit />}
        readField={<MiniFormChechboxRead />}
        onlyAdmin
      />
    </LabeledBlock>
  )
}
