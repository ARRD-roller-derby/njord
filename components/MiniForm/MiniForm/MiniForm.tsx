import { UserInterface } from '../../../types/User.interface'
import {
  ReactElement,
} from 'react'

import useMiniForm from './useMiniForm';
import MiniFormView from './MiniFormView';

interface Props {
  user: UserInterface
  model: any
  field: string
  uri: string
  label?: string
  reSync: Function
  onlyAdmin?: boolean
  editField: ReactElement
  readField: ReactElement
  profiles?: boolean | Array<string>
  column?: boolean
}

export default function MiniForm(props: Props) {
  const useProps = useMiniForm(props);

  return <MiniFormView {...props} {...useProps} />
}

