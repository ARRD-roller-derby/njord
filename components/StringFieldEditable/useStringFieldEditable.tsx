import { UserInterface } from '../../types/User.interface'
import useCanIMakeThis from '../_hooks/useCanIMakeThis'
import { useState, useEffect } from 'react'
import usePost from '../_hooks/usePost'

interface props {
  readonly user: UserInterface
  readonly field: string
  readonly uri: string
  readonly label?: string
  readonly reSync: Function
  readonly onlyAdmin?: boolean
}

export default function useStringFieldEditable({
  user,
  field,
  uri,
  reSync,
  onlyAdmin,
}: props) {
  const [value, setValue] = useState<string>(user[field]),
    [editMode, setEditMode] = useState<boolean>(false),
    { post, error, data } = usePost(uri),
    canIMakeThis = useCanIMakeThis(user._id, ['admin', 'bureau'], onlyAdmin)

  function handleSubmit(e: React.SyntheticEvent) {
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

  return {
    reset: handleReset,
    submit: handleSubmit,
    canIMakeThis,
    editMode,
    value,
    openEditMode: () => setEditMode(true),
    setValue,
  }
}
