import { useState, useEffect } from 'react'
import useDebounce from '../../../_hooks/useDebounce'
import useSilentPost from '../../../_hooks/useSilentPost'

export default function useMiniFormAddressSearch(setValue: Function,withSaveAddresses?:boolean) {
  const 
    [search, setSearch] = useState<string>(''),
    //stop search if clic, no trigger the debounce
    [stopSearch, setStopSearch] = useState<boolean>(false),
    [addresses, setAddresses] = useState<Array<any>>([]),
    { data,loading, post } = useSilentPost('addresses/search'),
    debounceSearch = useDebounce<string>(search)

  useEffect(() => {
    if (!debounceSearch) {
      setAddresses([])
    }
    if (debounceSearch && !stopSearch) {
      post({ search: debounceSearch, withSaveAddresses })
    }
    setStopSearch(false)
  }, [debounceSearch])

  useEffect(() => {
    if (data) setAddresses(data)
  }, [data])

  function handleSelect(address: any) {
    setStopSearch(true)
    setValue(address)
    setSearch(`${address.street || address.address || ''}, ${address.zipcode} ${address.city}`)
    setAddresses([])
  }

  useEffect(() => {
    if (withSaveAddresses) post({withSaveAddresses})
  }, [])

  return {
    setSearch,
    search,
    addresses,
    loading,
    handleSelect
  }
}