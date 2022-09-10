import { useState } from 'react'

export default function useMyAvatarWithPopin(onClose?: Function) {
  const [show, setShow] = useState<boolean>(false)

  function handleClose() {
    setShow(false)
    onClose && onClose(false)
  }

  return { close: handleClose, show, setShow }
}
