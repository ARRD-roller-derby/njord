import { UserInterface } from '../../../types/User.interface'
import {
  ReactElement,
} from 'react'

import useMiniForm from './useMiniForm';
import MiniFormView from './MiniFormView';

interface Props {
  readonly user: UserInterface
  readonly model:any
  readonly field: string
  readonly uri: string
  readonly label?: string
  readonly reSync: Function
  readonly onlyAdmin?: boolean
  readonly editField: ReactElement
  readonly readField: ReactElement
  readonly profiles?: boolean | Array<string>
  readonly column?:boolean
}

export default function MiniForm(props: Props) {
  
  const useProps = useMiniForm(props);

  return <MiniFormView {...props} {...useProps}/>
}

