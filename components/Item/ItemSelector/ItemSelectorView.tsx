import AsyncSelect from 'react-select/async'

interface props {
  readonly inputOptions: object
}

export default function ItemSelectorView({ inputOptions }: props) {
  return <AsyncSelect {...inputOptions}/>
}
