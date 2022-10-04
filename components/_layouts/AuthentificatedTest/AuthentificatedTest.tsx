import classes from './Authentificated.module.css'
import Head from 'next/head'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import Header from '../../Header/Header'
import useAuthentificated from './useAuthentificated'
import GiveYourName from '../../GiveYourName/GiveYourName'
import dynamic from 'next/dynamic'

//For Dev, if SSR, with localstorage bool for detect device, you failed hydrate
const Menu = dynamic(() => import('../../Menu/Menu'), { ssr: false })
interface props {
  readonly children: ReactNode
  readonly title?: string
}

export default function AuthentificatedTestLayout({ children, title }: props) {
  const { session } = useAuthentificated()

  return (
    <div className={classes.container} data-color-mode="dark">
      <Head>
        <title>{title && `${title} |`}Njörd</title>
        <meta name="description" content="Conçu par le ARRD" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={classes.header}>
        <Header />
        <GiveYourName />
        <ToastContainer
          draggablePercent={60}
          position={'top-right'}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </header>

      <div className={classes.menu}>
        {session &&  <Menu /> }
      </div>
      <main className={classes.main}>
        <div className={classes.box}>
          {session
            ? children
            :<button onClick={()=>window.location.reload()}>Recharger</button>}
        </div>
      </main>
    </div>
  )
}
