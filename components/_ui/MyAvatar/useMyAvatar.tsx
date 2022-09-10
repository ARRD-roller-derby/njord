import useNotificationWithFetch from '../../_hooks/useNotificationWithFetch'

export default function useMyAvatar() {
  const url = useNotificationWithFetch<string>('avatar', 'users/avatar')
  return {url }
}