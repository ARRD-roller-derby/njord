import { useRouter } from 'next/router'

export default function useUserPopin(setClose: Function,url:string='/users') {
  const router = useRouter(),
    uri = '/users/updateField'

  function handleClose() {
    router.push(url, url, { shallow: true })
    setClose()
  }

  return { close: handleClose, uri }
}
