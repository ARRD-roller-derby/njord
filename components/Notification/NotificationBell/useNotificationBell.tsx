import { useRouter } from 'next/router'

export default function useNotificationBell() {
  const { pathname } = useRouter()
  return { active: pathname === '/notifications' }
}
