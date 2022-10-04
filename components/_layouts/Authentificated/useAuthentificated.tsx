import { useSession } from 'next-auth/react'
import { useContext, useEffect } from 'react'
import useLocalState from '../../_hooks/useLocalState'
import usePush from '../../_hooks/usePush'
import { SocketContext } from '../../../stores/socket.store';
import useSocket from '../../_hooks/useSocket'

export default function useAuthentificated() {
  const { data: session } = useSession(),
    [_state, setState] = useContext(SocketContext),
    isConnected = usePush(),
    message = useSocket(session?.user._id),
    { localState, setLocalState } = useLocalState<{open:boolean}>(
      { open: false },
      'njord_menu_state'
    )

  function setIsOpen(value: boolean) {
    setLocalState({ open: value })
  }

  useEffect(() => {
    setState(message)
  }, [message])

  return {
    session,
    localState,
    isConnected,
    setIsOpen,
  }
}
