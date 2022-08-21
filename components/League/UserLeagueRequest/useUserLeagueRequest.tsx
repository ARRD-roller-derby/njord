import { useState } from 'react'
import { useSession } from 'next-auth/react';

export default function useUserLeagueRequest(): {
  open: boolean
  isAdmin:boolean
  openModale: Function
  closeModale: Function
} {
  const 
  {data:session} = useSession(),
  [open, setOpen] = useState<boolean>(false)


  return {
    open,
    isAdmin:session ? !!session.isAdmin || session.user.profiles.find((o:string)=>o ==='bureau'):false,
    openModale: () => setOpen(true),
    closeModale: () => setOpen(false),
  }
}
