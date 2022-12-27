import { FC } from 'react'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import { DailyContestFormProps, DailyContestFormResult } from './daily-contest-form'
import styles from './daily-contest-form.module.css'
import validator from 'validator'
import SubmitButton from '../../_ui/SubmitButton/SubmitButton'

//TODO affiche question ou resultat
export const DailyContestFormView: FC<
  DailyContestFormProps & DailyContestFormResult> = ({ closePopin, answers, nextQuestions, prevQuestions, question, selectChoice, handleSubmit, current, questions, loading, responses, percent }) => (
    <FullscreenModale setClose={closePopin}>

      <div className={styles.question}>

        <div className={styles.number}>{current} / {questions.length}</div>
        <div className={styles.img}>
          {question.img && <img src={question.img} />}
        </div>
        <div className={styles.title}>{validator.unescape(question.question)}</div>

        <div className={styles.choicesBox}>
          <div className={styles.choices}>
            {question.choices.map(choice =>
              <div
                key={choice}
                className={styles.choice}
                data-choice={answers?.[question._id] === choice}
                data-good={!!responses?.find(response => response === choice)}
                onClick={() => selectChoice(choice)}
              >
                {validator.unescape(choice)}
              </div>)}
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={prevQuestions}>précédent</button>
          {responses ? <div className={styles.score}>Ton score : {percent}{"%"}</div> : <SubmitButton loading={loading} text="Envoyer" onClick={handleSubmit} />}
          <button onClick={nextQuestions}>Suivant</button>
        </div>
      </div>
    </FullscreenModale >
  )