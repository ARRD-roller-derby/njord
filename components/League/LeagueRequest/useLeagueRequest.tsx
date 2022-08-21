import { useState } from 'react'

export default function useLeagueRequest(): {
  open: boolean
  openModale: Function
  closeModale: Function
} {
  const [open, setOpen] = useState<boolean>(false)

  return {
    open,
    openModale: () => setOpen(true),
    closeModale: () => setOpen(false),
  }
}
