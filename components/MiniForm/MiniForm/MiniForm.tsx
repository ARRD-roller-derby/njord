import { UserInterface } from '../../../types/User.interface'
import {
  ReactElement,
} from 'react'

import useMiniForm from './useMiniForm';
import MiniFormView from './MiniFormView';

interface props {
  readonly user: UserInterface
  readonly field: string
  readonly uri: string
  readonly label?: string
  readonly reSync: Function
  readonly onlyAdmin?: boolean
  readonly editField: ReactElement
  readonly readField: ReactElement
  readonly profiles?: Array<string>
}

export default function MiniForm({
  user,
  field,
  label,
  uri,
  reSync,
  onlyAdmin,
  profiles,
  editField,
  readField,
}: props) {
  
  const useProps = useMiniForm({  user,
    field,
    uri,
    profiles,
    reSync,
    onlyAdmin}),
    props = {...useProps,user,label,editField,readField}

  return <MiniFormView {...props}/>
}

