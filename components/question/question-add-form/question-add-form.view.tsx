import dynamic from "next/dynamic";
import { Cropper } from "react-cropper";
import LabeledBlock from "../../_ui/LabeledBlock/LabeledBlock";
import SubmitButton from "../../_ui/SubmitButton/SubmitButton";
import styles from "./question-add-form.module.css";
import { QuestionAddFormResults } from "./question-add-form.type";

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

export const QuestionAddFormView: React.FC<QuestionAddFormResults> = (
  { onChange, cropperRef, addBad, deleteBad, submitFile, delImg, img, addImg,
    onCrop, form, loading, onChangeBadAnwser, onSubmit }) => {

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
    <LabeledBlock title="Bonne réponse">
      <input placeholder="bonne réponse" value={form.good_answers} onChange={(e) => onChange('good_answers', e.target.value)} />
    </LabeledBlock>

    {form.bad_answers.map((bad_answer, index) => <LabeledBlock title={`Mauvaise réponse #${index + 1}`} key={bad_answer.index}>
      <div className={styles.badAnswer}>
        <input
          value={bad_answer.value}
          placeholder="mauvaise réponse"
          onChange={(e) => onChangeBadAnwser(e.target.value, bad_answer.index)}
        />
        <div className="buttonReset" onClick={() => deleteBad(bad_answer.index)}>supprimer</div>
      </div>
    </LabeledBlock>)}

    <div className={styles.actions}>
      <div className="button" onClick={addBad}>Ajouter une mauvaise réponse</div>
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