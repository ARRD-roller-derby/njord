import MiniFormCreateSelectView from "./MiniFormCreateSelectView"
import useMiniFormCreateSelect from "./useMiniFormCreateSelect"


interface props {
  readonly value?: string
  readonly setValue?: Function
  readonly isMulti?: boolean
  readonly options: any
}

export default function MiniFormCreateSelect({value, setValue,isMulti,options,}: props) {
  const { setAllState,selectState } = useMiniFormCreateSelect(value, setValue)
  return (
    <MiniFormCreateSelectView
      isMulti={isMulti}
      options={options}
      setValue={setAllState}
      value={selectState}
    />
  )
}
