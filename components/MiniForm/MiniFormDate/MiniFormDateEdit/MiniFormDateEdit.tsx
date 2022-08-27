import MiniFormSelectView from './MiniFormDateEditView'
import dayjs from 'dayjs';

interface props {
  readonly value?: string
  readonly setValue?: Function
}

export default function MiniFormDateEdit({value, setValue}: props) {
  return (
    <MiniFormSelectView
      setValue={setValue}
      value={dayjs(value).toDate()}
    />
  )
}
