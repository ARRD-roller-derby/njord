import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from 'react';

export default function LoginButton() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn() // Force sign in to hopefully resolve error
    }
  }, [session])

  if (session) {
    return (
      <>
        {"Connecté avec l'adresse"} {session.user.email} <br />
        <button onClick={() => signOut()}>Se déconnecter</button>
      </>
    )
  }
  return (
    <>
        {"Non Connecté"}<br />
      <button onClick={() => signIn()}>Se connecter</button>
    </>
  )
}