import { useState } from 'react'

export default function useAddAddress() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return {
    isOpen,
    openPopin: () => setIsOpen(true),
    closePopin: () => setIsOpen(false),
  }
}
