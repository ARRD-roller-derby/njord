import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { MenuLinksInterface } from "../../datasources/MenuLinks"

export default function useMenuDesktop() {
  const { data: session } = useSession(),
    { pathname } = useRouter(),
    iconSize = 15

  function filter(o: MenuLinksInterface) {
    if (o.admin) return session?.isAdmin
    if (o.admin_game) return session?.admin_game
    return true
  }

  return { iconSize, filter, pathname }
}