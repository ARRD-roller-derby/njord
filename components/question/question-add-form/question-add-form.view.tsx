import dynamic from "next/dynamic";
import { Cropper } from "react-cropper";
import LabeledBlock from "../../_ui/LabeledBlock/LabeledBlock";
import SubmitButton from "../../_ui/SubmitButton/SubmitButton";
import { QuestionAddFormInput } from "./question-add-form-input/question-add-form-input";
import styles from "./question-add-form.module.css";
import { QuestionAddFormResults } from "./question-add-form.type";

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

export const QuestionAddFormView: React.FC<QuestionAddFormResults> = (
  { onChange, cropperRef, addQuestion, deleteAnswer, submitFile, delImg, img, addImg,
    onCrop, form, loading, onChangeAnwser, onSubmit }) => {

  return <form className={styles.container} onSubmit={onSubmit}>
    <h2 className={styles.title}>Ajouter une question</h2>
    <LabeledBlock title="Question">
      <div className={styles.file}>

        {img ? <>
          <Cropper
            src={img}
            style={{ height: 200, width: 'auto' }}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
          />
          <div className={styles.buttons}>
            <div className="buttonReset" onClick={delImg}>Annuler</div>
            <div className="button" onClick={addImg}>Ajouter</div>
          </div>

        </> : (
          <>
            <label className="button" htmlFor="question_add_img">
              Ajouter une image
            </label>
            <input
              type="file"
              className={styles.fileInput}
              onChange={(e) => submitFile(e)}
              id="question_add_img"
              accept="image/*"
            />
          </>
        )}
      </div>
    </LabeledBlock>
    <LabeledBlock title="Question">
      <MarkdownEditor
        height={100}
        minHeight={100}
        enableScroll={false}
        preview="edit"
        value={form.question}
        onChange={(text: string) => onChange('question', text)}
      />
    </LabeledBlock>

    {form.answers.sort((a, b) => b.type.localeCompare(a.type)).map((answer, index) => <QuestionAddFormInput key={answer.index} index={form.answers.filter(a => a.type === answer.type).findIndex(aw => aw.index === answer.index)} answer={answer} onChangeAnwser={onChangeAnwser} deleteAnswer={deleteAnswer} />)}

    <div className={styles.actions}>
      <div className="button" onClick={() => addQuestion('good')}>Ajouter une bonne réponse</div>
      <div className="button" onClick={() => addQuestion('bad')}>Ajouter une mauvaise réponse</div>
    </div>

    <div className={styles.buttons}>
      <button type="reset" onClick={() => close()}>
        Annuler
      </button>
      <SubmitButton
        text="Créer la question"
        loading={loading}
      />
    </div>
  </form>
} 