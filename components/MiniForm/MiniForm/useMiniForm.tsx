import { UserInterface } from '../../../types/User.interface'
import useCanIMakeThis from '../../_hooks/useCanIMakeThis'
import { useState, useEffect, SyntheticEvent, useMemo } from 'react';
import usePost from '../../_hooks/usePost'

interface props {
  readonly user: UserInterface
  readonly field: string
  readonly uri: string
  readonly reSync: Function
  readonly onlyAdmin?: boolean
  readonly profiles: Array<String>
}

export default function useMiniForm({
  user,
  field,
  uri,
  reSync,
  onlyAdmin,
  profiles,
}: props) {
  const [value, setValue] = useState<string>(user[field]),
    [editMode, setEditMode] = useState<boolean>(false),
    { post, error, data } = usePost(uri),
    // si !onlyAdmin, l'user peut, sinon,faut avoir le profil. (en dehors d'admin, faut être de la même league)
    canIMakeThis = useCanIMakeThis(user._id, profiles, onlyAdmin),
    valueForRead = useMemo(()=>{ field.split('.').reduce((acc, key) => acc?.[key], { ...user })
    },[user]);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    setEditMode(false)
    post({ userId: user._id, field, value })
  }

  function handleReset() {
    setValue(user[field])
    setEditMode(false)
  }

  useEffect(() => {
    if (error) {
      setValue(user[field])
    }
  }, [error])

  useEffect(() => {
    if (data) {
      reSync()
    }
  }, [data])

  function openEditMode() {
    setEditMode(true)
  }

  return {
    canIMakeThis,
    editMode,
    value,
    valueForRead,
    setValue,
    openEditMode,
    submit: handleSubmit,
    reset: handleReset,
  }
}
