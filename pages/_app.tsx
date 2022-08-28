import { SessionProvider } from 'next-auth/react'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.css'
import 'leaflet/dist/leaflet.css'
import '../styles/globals.css'
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'

import fr from 'dayjs/locale/fr'
import { PusherContext } from '../stores/pusher.store'
import { useState } from 'react'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import frFns from 'date-fns/locale/fr'

registerLocale('fr', frFns)
setDefaultLocale('fr')
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.locale(fr)
dayjs.tz.guess()
dayjs.tz.setDefault("Europe/Paris")

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [state, setState] = useState()
  return (
    <SessionProvider session={session}>
      <PusherContext.Provider value={[state, setState]}>
        <Component {...pageProps} />
      </PusherContext.Provider>
    </SessionProvider>
  )
}
