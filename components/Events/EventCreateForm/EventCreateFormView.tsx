import classes from './EventCreateForm.module.css'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'
import ReactSelect from 'react-select'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import dayjs from 'dayjs'
import MiniFormDateEdit from '../../MiniForm/MiniFormDate/MiniFormDateEdit/MiniFormDateEdit'
import { EventType } from '../../../types/EventType.enum'
import MiniFormHourEdit from '../../MiniForm/MiniFormHour/MiniFormHourEdit/MiniFormHourEdit'
import { EventInterface } from '../../../types/Event.interface'
import { eventTypeForSelect } from '../../../utils/eventTypeForSelect'
import MiniFormTextEdit from '../../MiniForm/MiniFormText/MiniFormTextEdit/MiniFormTextEdit'
import MiniFormAddressEdit from '../../MiniForm/MiniFormAddress/MiniFormAddressEdit/MiniFormAddressEdit';
import MiniFormAddressSearch from '../../MiniForm/MiniFormAddress/MiniFormAddressSearch/MiniFormAddressEdit'

interface props {
  readonly onClose: Function
  readonly setKey: Function
  readonly event: any
}

export default function EventCreateFormView({ onClose, event, setKey }: props) {
  //TODO

  /**
   * Le titre ne s'affiche pas, comme la date de fin,
   * pour : training,AG, match,scrimmage
   *
   * pour match et scrimmage, les champs versus, avec create pour équipe.
   */
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
            setValue={() => console.log('ee')}
          />
        </LabeledBlock>
        {event?.type.match(/event|other|bootcamp/) && (<LabeledBlock title="Fini le">
          <MiniFormDateEdit
            value={event?.endDate}
            setValue={() => console.log('ee')}
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
        <LabeledBlock title="Description">
        <MiniFormTextEdit
            value={event?.description}
            setValue={(hour: string) => setKey('description', hour)}
          />
        </LabeledBlock>

        {!event?.type.match(/online/) &&<LabeledBlock title="Adresse">
        <MiniFormAddressSearch setValue={(address: object) => setKey('address', address)} withSaveAddresses/>
        </LabeledBlock> }
      </div> 
    </FullscreenModale>
  )
}
