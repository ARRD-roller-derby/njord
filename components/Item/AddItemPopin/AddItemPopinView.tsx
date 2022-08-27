import classes from './AddItemPopin.module.css'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'
import ReactSelect from 'react-select'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import { ItemOnwerType } from '../../../types/items.interface';

interface Props {
  readonly closePopin: Function
  readonly setType: Function
  readonly submit: Function
  readonly loading: boolean
  readonly label: string
  readonly setLabel: Function
}

export default function AddItemPopinView({
  closePopin,
  submit,
  setType,
  label,
  setLabel,
  loading,
}: Props) {
  /*

  TODO form classique, en miniform pour update
  on colle la localisation chez celui qui créé
  */
  return (
    <FullscreenModale setClose={() => closePopin()}>
      <>
        <h3>Ajouter un objet</h3>

        <div className={classes.container}>
          <p>Proprio seulement pour profile</p>
          <LabeledBlock title="propriétaire">
            <ReactSelect
              styles={reactSelectStyle}
              defaultValue={{
                label: 'moi',
                value: ItemOnwerType.user,
              }}
              onChange={(choice)=>setType(choice.value)}
              options={[
                {
                  label: 'moi',
                  value: ItemOnwerType.user,
                },
                {
                  label: 'ma league',
                  value: ItemOnwerType.league
                },
              ]}
            />
          </LabeledBlock>
          <LabeledBlock title="libellé">
            <input
              className={classes.input}
              value={label}
              placeholder="Label"
              onChange={(e) => setLabel(e.target.value)}
            />
          </LabeledBlock>

          <div className={classes.buttons}>
            <button
              disabled={loading}
              type="reset"
              onClick={() => closePopin()}
            >
              annuler
            </button>
            <button disabled={loading} type="submit" onClick={() => submit()}>
              ajouter
            </button>
          </div>
        </div>
      </>
    </FullscreenModale>
  )
}
