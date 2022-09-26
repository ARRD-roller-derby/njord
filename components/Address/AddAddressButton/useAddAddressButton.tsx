import { useState } from 'react'
import { useProps } from './AddAddressButton.type'

const useAddAddressButton = (): useProps => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return {
    isOpen,
    openPopin: () => setIsOpen(true),
    closePopin: () => setIsOpen(false),
  }
}

export default useAddAddressButton
