/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { FC } from 'react'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import { DailyContestFormProps, DailyContestFormResult } from './daily-contest-form'
import styles from './daily-contest-form.module.css'
import validator from 'validator'
import SubmitButton from '../../_ui/SubmitButton/SubmitButton'
import Info from '../../_ui/Info/Info'

//TODO affiche question ou resultat
export const DailyContestFormView: FC<
  DailyContestFormProps & DailyContestFormResult> = ({ closePopin, answers, nextQuestions, prevQuestions, question, selectChoice, handleSubmit, current, questions, loading, responses, percent, canISubmit }) => (
    <FullscreenModale setClose={closePopin}>

      <div className={styles.question}>

        <div className={styles.number}>{current} / {questions.length}</div>
        <div className={styles.img}>
          <div />
          {question.img && <img src={question.img} />}
        </div>
        <div className={styles.title}>{validator.unescape(question.question)}</div>
        <div>
          {question.multiChoice && <Info>{'Attention, question à choix multiple'}</Info>}
        </div>


        <div className={styles.choicesBox}>
          <div className={styles.choices}>
            {question.choices.map(choice =>
              <div
                key={choice}
                className={styles.choice}
                data-choice={answers?.[question._id]?.includes(choice)}
                data-good={responses?.find(response => response.id === question._id)?.answers.includes(choice)}
                onClick={() => selectChoice(choice, question.multiChoice)}
              >
                {validator.unescape(choice || '')}
              </div>)}
          </div>
        </div>
        <div className={styles.buttons}>

          <button onClick={prevQuestions}>précédent</button>
          {responses ? <div className={styles.score}>Ton score : {percent}{"%"}</div> : <SubmitButton loading={loading} text="Envoyer" onClick={handleSubmit} disabled={!canISubmit} />}
          <button onClick={nextQuestions}>Suivant</button>
        </div>
      </div>
    </FullscreenModale >
  )