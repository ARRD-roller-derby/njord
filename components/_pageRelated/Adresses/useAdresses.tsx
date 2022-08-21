import { addressInterface } from '../../../types/address.interface'
import useSilentDBSync from '../../_hooks/useSilentDBSync'
import { useState } from 'react'

export default function useAdresses() {
  const {
      data: addresses,
      loading,
      reSync,
    } = useSilentDBSync<Array<addressInterface>>(
      'addresses/addresses',
      'addresses',
      {
        limit: 100,
      }
    ),
    [addressForPopin, setAddressForPopin] = useState<
      addressInterface | undefined
    >()
    
  return {
    addresses,
    loading,
    reSync,
    openPopin: (address: addressInterface) => setAddressForPopin(address),
    closePopin: () => setAddressForPopin(undefined),
    addressForPopin,
  }
}
