import classes from './EventCreateForm.module.css'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import LabeledBlock from '../../_ui/LabeledBlock/LabeledBlock'
import ReactSelect from 'react-select'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import dayjs from 'dayjs'
import MiniFormDateEdit from '../../MiniForm/MiniFormDate/MiniFormDateEdit/MiniFormDate'
import { EventType } from '../../../types/EventType.enum'
import MiniFormHourEdit from '../../MiniForm/MiniFormHour/MiniFormHourEdit/MiniFormHourEdit';
import { EventInterface } from '../../../types/Event.interface'

interface props {
  readonly onClose: Function
  readonly setStart: Function
  readonly event: EventInterface
}

export default function EventCreateFormView({ onClose,event,setStart }: props) {

  console.log(event)
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
          <ReactSelect
            styles={reactSelectStyle}
            defaultValue={{
              label: 'Entrainement',
              value: EventType.training,
            }}
            options={[]}
            onChange={(choice) => console.log(choice)}
          />
        
        <LabeledBlock title="Titre">
          <>INPUT</>
        </LabeledBlock>
        <LabeledBlock title="Commence le ">
          <MiniFormDateEdit
            value={dayjs().toString()}
            setValue={() => console.log('ee')}
          />
        </LabeledBlock>

        <LabeledBlock title="Ajouter une adresse">
          <MiniFormHourEdit setValue={(hour:string)=>setStart(hour)}/>
        </LabeledBlock>
      </div>
    </FullscreenModale>
  )
}
