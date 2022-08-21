import Creatable  from 'react-select/creatable';
import reactSelectStyle from '../../../styles/reactSelectStyle'
import useEmailSelector from './useEmailSelector'

interface props {
  readonly onSelect: Function
}

export default function EmailSelector({ onSelect }: props) {
  const { onChange } = useEmailSelector(onSelect),
    inputOptions = {
      instanceId: 'UserSelector',
      isClearable: true,
      isMulti:true,
      cacheOptions: true,
      formatCreateLabel: (inputValue:string)=>inputValue,
      styles: reactSelectStyle,
      noOptionsMessage: () => 'Aucune league trouvée',
      placeholder: 'Email...',
      onChange,
    }

  return <Creatable {...inputOptions} />
}
