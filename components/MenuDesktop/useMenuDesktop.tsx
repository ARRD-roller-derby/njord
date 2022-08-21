import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { MenuLinksInterface } from "../../datasources/MenuLinks"

export default function useMenuDesktop(){
  const { data: session } = useSession(),
  {pathname} = useRouter(),
  iconSize = 15

  function filter(o:MenuLinksInterface){
    return o.admin ? session?.isAdmin : true
  }

  return {iconSize,filter,pathname}
}