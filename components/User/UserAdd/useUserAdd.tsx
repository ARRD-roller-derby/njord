import { useState } from 'react'
import { UserInterface } from '../../../types/User.interface'

export default function useUserAdd(openPopin: Function) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleClose(user: UserInterface) {
    setIsOpen(false)
    openPopin(user)
  }

  function handleOpen() {
    setIsOpen(true)
  }

  return {
    isOpen,
    handleClose,
    handleOpen,
  }
}
