import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { pageTitle } from '../../datasources/pageTitle'
import useIsMobile from '../_hooks/useIsMobile'

export default function useGoBack() {
  const router = useRouter(),
    isMobile = useIsMobile(),
    currentPage = useMemo(() => {
      const title = pageTitle[router.route]
      return title || 'Njörd'
    }, [router.route])
  return {
    isHome: !isMobile ? true :router.asPath === '/',
    goBack: router.back,
    currentPage,
    isMobile,
  }
}
