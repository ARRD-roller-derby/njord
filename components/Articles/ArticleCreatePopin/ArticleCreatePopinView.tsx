import dynamic from 'next/dynamic'
import ReactSelect from 'react-select'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import SubmitButton from '../../_ui/SubmitButton/SubmitButton'
import classes from './ArticleCreatePopin.module.css'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'

const MarkdownEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})

interface Props {
  readonly close: Function
  readonly profiles: Array<{ label: string; value: string }>
  readonly onSubmit: Function
  readonly loading: boolean
  readonly onChange: Function
  readonly form: {content:string,profile:string,visibility:string}
}

export default function ArticleCreatePopinView({
  close,
  profiles,
  onSubmit,
  loading,
  onChange,
  form,
}: Props) {
  return (
    <FullscreenModale setClose={close}>
      <div className={classes.container}>
        <h2 className={classes.title}>Rédiger une news</h2>
        <LabeledBlock title="Pôle">
          <ReactSelect
            styles={reactSelectStyle}
            value={{label:form.profile,value:form.profile}}
            options={profiles}
            menuPlacement="top"
            onChange={(choice) => onChange('profile', choice.value)}
          />
        </LabeledBlock>
        <LabeledBlock title="Article">
          <MarkdownEditor
            height={300}
            minHeight={300}
            enableScroll={false}
            preview="edit"
            value={form.content}
            onChange={(text: string) => onChange('content', text)}
          />
        </LabeledBlock>
        <LabeledBlock title="visibilité">
          <ReactSelect
            styles={reactSelectStyle}
            value={{label:form.visibility,value:form.visibility}}
            options={[
              { label: 'league', value: 'league' },
              { label: 'public', value: 'public' },
            ]}
            menuPlacement="top"
            onChange={(choice) => onChange('visibility', choice.value)}
          />
        </LabeledBlock>

        <div className={classes.buttons}>
          <button type="reset" onClick={() => close()}>
            Annuler
          </button>
          <SubmitButton
            onClick={() => onSubmit()}
            text="Créer l'événement"
            loading={loading}
          />
        </div>
      </div>
    </FullscreenModale>
  )
}
