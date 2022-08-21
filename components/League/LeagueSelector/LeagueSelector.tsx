import AsyncSelect from 'react-select/async'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import useLeagueSelector from './useLeagueSelector';

interface props {
  readonly onSelect: Function
}

export default function LeagueSelector({onSelect}:props) {
  const 
  {options,onChange} = useLeagueSelector(onSelect),
  inputOptions = {
    instanceId: 'LeaguesSelector',
    isClearable: true,
    cacheOptions: true,
    styles: reactSelectStyle,
    noOptionsMessage: () => 'Aucune league trouvée',
    placeholder: 'Leagues...',
    onChange,
    loadOptions:options,
  }

  return <AsyncSelect {...inputOptions} />
}
