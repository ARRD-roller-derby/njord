import classes from './EventCreateForm.module.css'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'
import ReactSelect from 'react-select'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import MiniFormDateEdit from '../../MiniForm/MiniFormDate/MiniFormDateEdit/MiniFormDateEdit'
import { EventType } from '../../../types/EventType.enum'
import MiniFormHourEdit from '../../MiniForm/MiniFormHour/MiniFormHourEdit/MiniFormHourEdit'
import { eventTypeForSelect } from '../../../utils/eventTypeForSelect'
import MiniFormTextEdit from '../../MiniForm/MiniFormText/MiniFormTextEdit/MiniFormTextEdit'
import MiniFormAddressSearch from '../../MiniForm/MiniFormAddress/MiniFormAddressSearch/MiniFormAddressEdit'
import ItemSelector from '../../Item/ItemSelector/ItemSelector';
import RecurrenceSelector from '../RecurrenceSelector/RecurrenceSelector';
import SubmitButton from '../../_ui/SubmitButton/SubmitButton'

interface props {
  readonly onClose: Function
  readonly setKey: Function
  readonly event: any
  readonly loading: boolean
  readonly onSubmit: Function
}

export default function EventCreateFormView({ onClose, event, setKey,loading,onSubmit }: props) {

  return (
    <FullscreenModale setClose={onClose}>
      <div className={classes.container}>
        <h3 className={classes.title}>Créer un événement</h3>

        <LabeledBlock title="type">
          <ReactSelect
            styles={reactSelectStyle}
            defaultValue={{
              label: 'Entrainement',
              value: EventType.training,
            }}
            options={eventTypeForSelect}
            onChange={(choice) => setKey('type', choice.value)}
          />
        </LabeledBlock>

        {!event?.type.match(/training|match|scrimmage|AG/) && (
          <LabeledBlock title="Titre">
            <input
              value={event?.title}
              onChange={(e) => setKey('title', e.target.value)}
              placeholder="titre..."
            />
          </LabeledBlock>
        )}
        <LabeledBlock title="Commence le">
          <MiniFormDateEdit
            value={event?.startDate}
            setValue={(date:Date) => setKey('startDate', date)}
          />
        </LabeledBlock>
        {event?.type.match(/event|other|bootcamp/) && (<LabeledBlock title="Fini le">
          <MiniFormDateEdit
            value={event?.endDate}
            setValue={(date:Date) => setKey('endDate', date)}
          />
        </LabeledBlock>)}
        <LabeledBlock title="Heure de début">
          <MiniFormHourEdit
            setValue={(hour: string) => setKey('hourStart', hour)}
          />
        </LabeledBlock>
        <LabeledBlock title="Heure de fin">
          <MiniFormHourEdit
            setValue={(hour: string) => setKey('hourEnd', hour)}
          />
        </LabeledBlock>
        <LabeledBlock title="Récurrence">
        <RecurrenceSelector setValue={(recurrence: object) => setKey('recurrence', recurrence)}/>
        </LabeledBlock>
        <LabeledBlock title="Description">
        <MiniFormTextEdit
            value={event?.description}
            setValue={(hour: string) => setKey('description', hour)}
          />
        </LabeledBlock>

        {!event?.type.match(/online/) && <LabeledBlock title="Adresse">
        <MiniFormAddressSearch setValue={(address: object) => setKey('address', address)} withSaveAddresses/>
        </LabeledBlock> }

        <LabeledBlock title="Objets">
        <ItemSelector setValue={(items: Array<string>) => setKey('items', items)} />
        </LabeledBlock>
        <LabeledBlock title="Visibilité">
          <ReactSelect
            styles={reactSelectStyle}
            defaultValue={{
              label: 'League',
              value: 'league',
            }}
            options={[
              {
                label: 'League',
                value: 'league',
              },
              {
                label: 'public',
                value: 'public',
              }
            ]}
            onChange={(choice) => setKey('visibility', choice.value)}
          />
        </LabeledBlock>
        <div className={classes.buttons}>
          <button type="reset" onClick={()=>onClose()}>Annuler</button>
          <SubmitButton onClick={()=>onSubmit()} text="Créer l'événement" loading={loading}/>
        </div>
      </div> 
    </FullscreenModale>
  )
}
