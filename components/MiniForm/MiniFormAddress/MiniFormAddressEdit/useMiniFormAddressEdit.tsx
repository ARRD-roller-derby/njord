import { useState, useEffect } from 'react'
import useDebounce from '../../../_hooks/useDebounce'
import useSilentPost from '../../../_hooks/useSilentPost'
import { addressType } from '../../../../types/addressType.enum'

export default function useMiniFormAddressEdit(setValue: Function) {
  const [form, setForm] = useState({
      label: '',
      address: {},
      type: addressType.personnal,
    }),
    [search, setSearch] = useState<string>(''),
    //stop search if clic, no trigger the debounce
    [stopSearch, setStopSearch] = useState<boolean>(false),
    [addresses, setAddresses] = useState<Array<any>>([]),
    { data, post } = useSilentPost('addresses/search'),
    debounceSearch = useDebounce<string>(search)

  useEffect(() => {
    if (!debounceSearch) {
      setAddresses([])
    }
    if (debounceSearch && !stopSearch) {
      post({ search: debounceSearch })
    }
    setStopSearch(false)
  }, [debounceSearch])

  useEffect(() => {
    if (data) setAddresses(data)
  }, [data])

  //form optimize catch value, watch change for. not garantue if add setValue after set form
  useEffect(() => {
    setValue(form)
  }, [form])

  function handleSelect(address: any) {
    setStopSearch(true)
    setForm((prevState) => ({
      ...prevState,
      address,
    }))
    setSearch(`${address.address}, ${address.zipcode} ${address.city}`)
    setAddresses([])
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
    setSearch,
    search,
    addresses,
    handleSelect,
    label: form.label,
    setLabel,
    setType,
  }
}
