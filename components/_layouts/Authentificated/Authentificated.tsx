import classes from './Authentificated.module.css'
import Head from 'next/head'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import MenuDesktop from '../../MenuDesktop/MenuDesktop'
import Header from '../../Header/Header'
import useAuthentificated from './useAuthentificated'
import MenuMobile from '../../MenuMobile/MenuMobile'
import GiveYourName from '../../GiveYourName/GiveYourName'

interface props {
  readonly children: ReactNode
  readonly title?: string
}

export default function AuthentificatedLayout({ children, title }: props) {
  const { isMobile, session } = useAuthentificated()

  return session ? (
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
        {isMobile ? <MenuMobile/> : <MenuDesktop />}
      </div>
      <main className={classes.main}>
          <div className={classes.box}>{children}</div>
      </main>
      
    </div>
  ) : (
    <></>
  )
}
