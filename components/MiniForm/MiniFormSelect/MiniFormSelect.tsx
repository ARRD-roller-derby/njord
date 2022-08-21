import MiniFormSelectView from './MiniFormSelectView'
import useMiniFormSelect from './useMiniFormSelect'

interface props {
  readonly value?: string
  readonly setValue?: Function
  readonly isMulti?: boolean
  readonly options: any
}

export default function MiniFormSelect({value, setValue,isMulti,options,}: props) {
  const { selectState, setAllState } = useMiniFormSelect(value, setValue)
  return (
    <MiniFormSelectView
      isMulti={isMulti}
      options={options}
      setValue={setAllState}
      value={selectState}
    />
  )
}
