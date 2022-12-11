import { UserInterface } from "../../../types/User.interface";
import MiniForm from "../../MiniForm/MiniForm/MiniForm";
import MiniFormCheckboxEdit from "../../MiniForm/MiniFormCheckbox/MiniFormCheckboxEdit/MiniFormCheckboxEdit";
import MiniFormChechboxRead from "../../MiniForm/MiniFormCheckbox/MiniFormCheckboxRead/MiniFormCheckboxRead";
import LabeledBlock from "../../_ui/LabeledBlock/LabeledBlock";

interface props {
  user: UserInterface
  uri: string
  reSync: Function
}

export const UserBlockAdmin: React.FC<props> = ({ reSync, user, uri }) => (
  <LabeledBlock title="Admin">
    <MiniForm
      label="Admin"
      model={user}
      user={user}
      field="admin"
      uri={uri}
      reSync={reSync}
      editField={<MiniFormCheckboxEdit />}
      readField={<MiniFormChechboxRead />}
      onlyAdmin
    />
    <MiniForm
      label="Admin (jeu)"
      model={user}
      user={user}
      field="admin_game"
      uri={uri}
      reSync={reSync}
      editField={<MiniFormCheckboxEdit />}
      readField={<MiniFormChechboxRead />}
      onlyAdmin
    />
  </LabeledBlock>
)