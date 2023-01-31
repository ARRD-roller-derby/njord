import { SessionProvider } from 'next-auth/react'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.css'
import 'leaflet/dist/leaflet.css'
import 'nprogress/nprogress.css'
import '../styles/globals.css'
import 'cropperjs/dist/cropper.css'
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import duration from 'dayjs/plugin/duration'
import fr from 'dayjs/locale/fr'
import { useState } from 'react'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import frFns from 'date-fns/locale/fr'
import { SocketContext } from '../stores/socket.store';
import NProgress from 'nprogress'
import { Router } from 'next/router'
import { MiniLoaderProvider } from '../components/mini-loader/mini-loader'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: false })

registerLocale('fr', frFns)
setDefaultLocale('fr')
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(duration)
dayjs.locale(fr)
dayjs.tz.guess()
dayjs.tz.setDefault("Europe/Paris")

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [state, setState] = useState()

  return (
    <MiniLoaderProvider>
      <SessionProvider session={session}>
        <SocketContext.Provider value={[state, setState]}>
          <Component {...pageProps} />
        </SocketContext.Provider>
      </SessionProvider>
    </MiniLoaderProvider>
  )
}
