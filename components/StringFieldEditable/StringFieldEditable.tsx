import { UserInterface } from '../../types/User.interface'
import useStringFieldEditable from './useStringFieldEditable'
import StringFieldEditableView from './StringFieldEditableView'

enum typeOfInput {
  test='text',
  email='email',
  tel='tel',
  date='date',
  number='number',
  time='time',
  password='password'
}

interface props {
  readonly user: UserInterface
  readonly field: string
  readonly uri: string
  readonly label?: string
  readonly reSync: Function
  readonly onlyAdmin?: boolean
  readonly type: typeOfInput
}

export default function StringFieldEditable({
  user,
  field,
  label,
  uri,
  reSync,
  onlyAdmin,
  type
}: props) {
  const useProps = useStringFieldEditable({user,field,uri,reSync,onlyAdmin}),
  props = {...useProps,label,type}

  return <StringFieldEditableView {...props} />
}

