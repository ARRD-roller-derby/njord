import MiniForm from '../../MiniForm/MiniForm/MiniForm'
import MiniFormStringEdit from '../../MiniForm/MiniFormString/MiniFormStringEdit/MiniFormStringEdit'
import MiniFormStringRead from '../../MiniForm/MiniFormString/MiniFormStringRead/MiniFormStringRead'
import MiniFormDateRead from '../../MiniForm/MiniFormDate/MiniFormDateRead/MiniFormDateRead'
import MiniFormDateEdit from '../../MiniForm/MiniFormDate/MiniFormDateEdit/MiniFormDateEdit'
import MiniFormTextEdit from '../../MiniForm/MiniFormText/MiniFormTextEdit/MiniFormTextEdit'
import MiniFormTextRead from '../../MiniForm/MiniFormText/MiniFormTextRead/MiniFormTextRead'
import { EventInterface } from '../../../types/Event.interface'
import { UserInterface } from '../../../types/User.interface'
import classes from './EventUpdateTab.module.css'
import MiniFormHourEdit from '../../MiniForm/MiniFormHour/MiniFormHourEdit/MiniFormHourEdit'
import MiniFormAddressEdit from '../../MiniForm/MiniFormAddress/MiniFormAddressEdit/MiniFormAddressEdit'
import MiniFormAddressRead from '../../MiniForm/MiniFormAddress/MiniFormAddressRead/MiniFormAddressRead'

interface props {
  readonly event: EventInterface
  readonly reSync: Function
  readonly uri: string
  readonly user: UserInterface
}

export default function EventUpdateTab({ event, uri, reSync, user }: props) {
  return (
    <div className={classes.container}>
      {!event?.type.match(/training|match|scrimmage|AG/) && (
        <MiniForm
          label="Titre"
          user={user}
          field="title"
          profiles
          onlyAdmin
          uri={uri}
          model={event}
          reSync={reSync}
          editField={<MiniFormStringEdit />}
          readField={<MiniFormStringRead />}
        />
      )}
      <MiniForm
        label="date de début"
        user={user}
        field="start"
        profiles
        onlyAdmin
        uri={uri}
        model={event}
        reSync={reSync}
        editField={<MiniFormDateEdit />}
        readField={<MiniFormDateRead />}
      />
      {event?.type.match(/event|other|bootcamp/) && (
        <MiniForm
          label="date de fin"
          user={user}
          field="end"
          profiles
          onlyAdmin
          uri={uri}
          model={event}
          reSync={reSync}
          editField={<MiniFormDateEdit />}
          readField={<MiniFormDateRead />}
        />
      )}
      <MiniForm
        label="Heure de début"
        user={user}
        field="hourStart"
        profiles
        onlyAdmin
        uri={uri}
        model={event}
        reSync={reSync}
        editField={<MiniFormHourEdit />}
        readField={<MiniFormStringRead />}
      />
      <MiniForm
        label="Heure de fin"
        user={user}
        field="hourEnd"
        profiles
        onlyAdmin
        uri={uri}
        model={event}
        reSync={reSync}
        editField={<MiniFormHourEdit />}
        readField={<MiniFormStringRead />}
      />

      <MiniForm
        label="description"
        user={user}
        field="description"
        profiles
        column
        onlyAdmin
        uri={uri}
        model={event}
        reSync={reSync}
        editField={<MiniFormTextEdit />}
        readField={<MiniFormTextRead />}
      />
    </div>
  )
}
