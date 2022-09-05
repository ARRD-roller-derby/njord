import React, { useState, useEffect } from 'react'
import usePost from '../../_hooks/usePost'

export default function useLeagueRequestForm(close: Function) {
  const [select, setSelect] = useState<Object | null>(),
    { post, loading, data } = usePost('requests/league/send')

  function handleSubmit(e?: React.SyntheticEvent) {
    e?.preventDefault()
    if(select){
      post({ ...select })
      setSelect(null)
    }
  }

  useEffect(() => {
    if (data) {
      close()
    }
  }, [data])

  return { onSelect: setSelect, submit: handleSubmit, loading }
}
