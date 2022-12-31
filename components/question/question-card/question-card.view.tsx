/* eslint-disable @next/next/no-img-element */
import { QuestionCardResults } from "./question.type";
import styles from "./question-card.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import validator from "validator";
import { percent } from "../../../utils/percent";
import { questionDifficulty } from "../../../utils/question-difficulty";
import MiniFormCheckboxEdit from "../../MiniForm/MiniFormCheckbox/MiniFormCheckboxEdit/MiniFormCheckboxEdit";

export const QuestionCardView: React.FC<QuestionCardResults> = ({
  question,
  deleteQuestion,
  activate
}) => (
  <div className={styles.container}>
    <div className={styles.activate}>
      <MiniFormCheckboxEdit
        value={question.active}
        label="Activer la question"
        setValue={activate}
      />
    </div>
    {question.img && <div className={styles.img}>
      <img src={question.img} alt="illutrastion" />
    </div>}
    <div className={styles.question}>
      <ReactMarkdown>{validator.unescape(question.question)}</ReactMarkdown>
    </div>
    <div className={styles.questions}>
      <div className={styles.good}>
        {validator.unescape(question.good_answers)}
      </div>
      {question.bad_answers.map((bad_answer) => (
        <div className={styles.bad} key={bad_answer}>
          {validator.unescape(bad_answer)}
        </div>
      ))}
    </div>


    <div className={styles.difficulty}>
      Difficulté :{" "} {question.good_answers_num} - {question.bad_answers_num}
      {questionDifficulty(
        percent(
          question.good_answers_num,
          question.good_answers_num ?? 0 + question.bad_answers_num ?? 0
        )
      )}
      {` (${percent(
        question.good_answers_num,
        question.good_answers_num ?? 0 + question.bad_answers_num ?? 0
      )}%)`}
    </div>



    <div className={styles.buttons}>
      <div className="button" onClick={deleteQuestion}>Supprimer la question</div>
    </div>
  </div>
);
