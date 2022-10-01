import { useSession } from 'next-auth/react'
import { useContext, useEffect } from 'react'
import { PusherContext } from '../../../stores/pusher.store'
import useLocalState from '../../_hooks/useLocalState'
import usePush from '../../_hooks/usePush'
import usePusher from '../../_hooks/usePusher'

export default function useAuthentificated() {
  const { data: session } = useSession(),
    [_state, setState] = useContext(PusherContext),
    isConnected = usePush(),
    message = usePusher(session?.user._id + '-notification'),
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
