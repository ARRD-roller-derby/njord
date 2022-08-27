import { useState, useEffect } from 'react'
import { addressType } from '../../../../types/addressType.enum'

export default function useMiniFormAddressEdit(setValue: Function) {
  const [form, setForm] = useState({
      label: '',
      address: {},
      type: addressType.personnal,
    });

  //form optimize catch value, watch change for. not garantue if add setValue after set form
  useEffect(() => {
    setValue(form)
  }, [form])

  function handleSelect(address: any) {
    setForm((prevState) => ({
      ...prevState,
      address,
    }))
  }

  function setLabel(value: string) {
    setForm((prevState) => ({
      ...prevState,
      label: value,
    }))
  }

  function setType(value: addressType) {
    setForm((prevState) => ({
      ...prevState,
      type: value,
    }))
  }

  return {
    handleSelect,
    label: form.label,
    setLabel,
    setType,
  }
}
