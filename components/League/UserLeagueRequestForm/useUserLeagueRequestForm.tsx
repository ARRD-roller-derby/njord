import React, { useState, useEffect } from 'react'
import usePost from '../../_hooks/usePost'

export default function useUserLeagueRequestForm(close: Function,defaultValue?:string) {
  const [select, setSelect] = useState<Object | null>(defaultValue ? {label:defaultValue,value:defaultValue}:null),
    { post, loading, data } = usePost('requests/user/sendLeague')

  function handleSubmit(e?: React.SyntheticEvent) {
    e?.preventDefault()
    if(select){
      post({ emails:select })
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
