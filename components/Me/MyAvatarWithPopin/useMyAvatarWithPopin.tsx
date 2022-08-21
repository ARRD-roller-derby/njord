import { useState } from 'react'
import useNotificationWithFetch from '../../_hooks/useNotificationWithFetch'

export default function useMyAvatarWithPopin(onClose?: Function) {
  const avatarUrl = useNotificationWithFetch<string>('avatar', 'users/avatar'),
    [show, setShow] = useState<boolean>(false)

  function handleClose() {
    setShow(false)
    onClose && onClose(false)
  }

  return { close: handleClose, show, setShow, avatarUrl }
}
