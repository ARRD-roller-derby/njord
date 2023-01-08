import LabeledBlock from "../../../_ui/LabeledBlock/LabeledBlock";
import styles from "./question-add-form-input.module.css";

interface QuestionAddFormInputProps {
  onChangeAnwser: (value: string, type: string, index: string) => void;
  deleteAnswer: (index: string) => void;
  answer: {
    value: string;
    type: 'good' | 'bad';
    index: string;
  }
  index: number;
}
export const QuestionAddFormInput: React.FC<QuestionAddFormInputProps> = ({ index, answer, onChangeAnwser, deleteAnswer }) => (<LabeledBlock warning={answer.type === 'bad'} title={`${answer.type === 'good' ? 'Bonne' : 'Mauvaise'} Réponse #${index + 1}`} key={answer.index}>
  <div className={styles.answer}>
    <input
      value={answer.value}
      placeholder={`${answer.type === 'good' ? 'Bonne' : 'Mauvaise'} réponse`}
      onChange={(e) => onChangeAnwser(e.target.value, answer.type, answer.index)}
    />
    <div className="buttonReset" onClick={() => deleteAnswer(answer.index)}>supprimer</div>
  </div></LabeledBlock>)