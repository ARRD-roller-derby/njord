import { useState } from 'react'

export default function useLocalState<T>(initialState: T, nameOfState: string):{
  localState: T,
  setLocalState:Function,
} {
  const ls = (): T => {
      if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(nameOfState))
      } else {
        return initialState
      }
    },
    [state, setState] = useState<T>(ls())

  function setLocalState(newState: T) {
    setState(newState)
    localStorage.setItem(nameOfState, JSON.stringify(newState))
  }
  
  return {
    localState: state,
    setLocalState,
  }
}
