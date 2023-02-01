import LabeledBlock from "../../../_ui/LabeledBlock/LabeledBlock";
import { ChoiceForm } from "../poll-form";
import styles from './poll-form-input.module.css';

interface PollFormInputProps {
  onChangeOptions: (value: string, index: string) => void
  deleteOption: (index: string) => void
  option: ChoiceForm
  index: number;
}

export const PollFormInput: React.FC<PollFormInputProps> = ({ index, option, onChangeOptions, deleteOption }) => (<LabeledBlock title={`Ajouter un choix #${index + 1}`} key={option.index}>
  <div className={styles.option}>
    <input
      value={option.value}
      placeholder={`Ajouter un choix`}
      onChange={(e) => onChangeOptions(e.target.value, option.index)}
    />
    <div className="buttonReset" onClick={() => deleteOption(option.index)}>supprimer</div>
  </div></LabeledBlock>)