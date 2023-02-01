import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import usePost from '../../_hooks/usePost';
import Factory from '../../_layouts/Factory/Factory';
import { PollsContext } from '../../_pageRelated/polls/polls';
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock';
import SubmitButton from '../../_ui/SubmitButton/SubmitButton';
import { PollFormInput } from './poll-form-input/poll-form-input';
import styles from './poll-form.module.css';
import { FullscreenPopinContext } from "../../fullscreen-popin/fullscreen-popin.context";

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

// TYPES --------------------------------------------
export type ChoiceForm = { index: string, value: string }

export type IPollForm = {
  description: string
  options: ChoiceForm[]
  visibility: 'league' | 'public'
  expireAt: number
  multiChoice: boolean
}

export interface PollFormResults {
  form: IPollForm
  loading: boolean
  onChangeOptions: (value: string, index: string) => void
  onChange: (key: 'title' | 'description' | 'visibility' | 'expireAt' | 'multiChoice', value: string | number | boolean) => void
  addOption: () => void
  deleteOption: (index: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  close: () => void
}

// HOOK ----------------------------------------
export const usePollForm = (): PollFormResults => {
  const
    { data, loading, post } = usePost('poll/add'),
    { refetch } = useContext(PollsContext),
    { close } = useContext(FullscreenPopinContext)

  const [form, setForm] = useState<IPollForm>({
    description: '',
    options: [{
      index: uuidv4(),
      value: '',
    }
    ],
    visibility: 'league',
    expireAt: 3,
    multiChoice: true
  })

  const onChange = (key: 'title' | 'description' | 'visibility' | 'expireAt' | 'multiChoice', value: string | number | boolean) => {
    setForm(prevState => ({ ...prevState, [key]: value }))
  }

  const addOption = () => {
    setForm(prevState => ({
      ...prevState,
      options: [...prevState.options, { index: uuidv4(), value: '' }]
    }
    ))
  }

  const onChangeOptions = (value: string, index: string) => {
    setForm(prevState => {
      const options = [...prevState.options]
      const indexArray = options.findIndex(answer => answer.index === index)
      options.splice(indexArray, 1, { index, value })
      return { ...prevState, options }
    })
  }

  const deleteOption = (index: string) => {
    setForm(prevState => ({
      ...prevState,
      options: prevState.options.filter(option => option.index !== index)
    }))
  }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (form.options.length < 2) return toast.error('Au moins 2 choix')
    post({
      ...form, options: form.options.map(option => option.value)
    })

  }

  useEffect(() => {
    if (data) {
      refetch()
      close()
    }
  }, [data])

  return {
    form,
    deleteOption,
    addOption,
    onChange,
    onChangeOptions,
    loading,
    onSubmit,
    close
  }
}

// VIEW ----------------------------------------

export const PollFormView: React.FC<PollFormResults> = ({ onSubmit, form, onChangeOptions, onChange, addOption, deleteOption, loading, close }) => (
  <form className={styles.container} onSubmit={onSubmit}>
    <h2 className={styles.title}>Ajouter un sondage</h2>

    <LabeledBlock title="Question">
      <MarkdownEditor
        height={100}
        minHeight={100}
        enableScroll={false}
        preview="edit"
        value={form.description}
        onChange={(text: string) => onChange('description', text)}
      />
    </LabeledBlock>

    <LabeledBlock title="Plusieurs réponses possible">
      <div className={styles.choices}>
        <div
          data-checked={form.multiChoice}
          className={styles.choice} onClick={() => onChange('multiChoice', true)}>OUI</div>
        <div
          data-checked={!form.multiChoice}
          className={styles.choice} onClick={() => onChange('multiChoice', false)}>NON</div>

      </div>
    </LabeledBlock>

    <LabeledBlock title="Visibilité">
      <div className={styles.choices}>
        <div
          data-checked={form.visibility === 'league'}
          className={styles.choice} onClick={() => onChange('visibility', 'league')}>LEAGUE</div>
        <div
          data-checked={form.visibility === 'public'}
          className={styles.choice} onClick={() => onChange('visibility', 'public')}>PUBLIQUE</div>

      </div>
    </LabeledBlock>

    <LabeledBlock title="Expire dans">
      <div className={styles.choices}>
        <div
          data-checked={form.expireAt === 1}
          className={styles.choice} onClick={() => onChange('expireAt', 1)}>1 JOUR</div>
        <div
          data-checked={form.expireAt === 3}
          className={styles.choice} onClick={() => onChange('expireAt', 3)}>3 JOURS</div>
        <div
          data-checked={form.expireAt === 7}
          className={styles.choice} onClick={() => onChange('expireAt', 7)}>7 JOURS</div>

      </div>
    </LabeledBlock>

    {form.options.map((option, index) => <PollFormInput key={option.index} index={index} option={option} onChangeOptions={onChangeOptions} deleteOption={deleteOption} />)}

    <div className={styles.actions}>
      <div className="button" onClick={addOption}>Ajouter un choix</div>
    </div>

    <div className={styles.buttons}>
      <button type="reset" onClick={close}>
        Annuler
      </button>
      <SubmitButton
        text="Créer le sondage"
        loading={loading}
      />
    </div>
  </form>
)

// COMPONENT ----------------------------------------
export const PollForm = Factory<unknown, PollFormResults>(usePollForm, PollFormView)