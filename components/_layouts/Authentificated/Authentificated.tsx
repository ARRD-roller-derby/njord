import classes from "./Authentificated.module.css";
import Head from "next/head";
import { ReactNode, useState } from "react";
import { ToastContainer } from "react-toastify";
import AppName from "../../_ui/AppName/AppName";
import MyAvatarWithPopin from "../../MyAvatarWithPopin/MyAvatarWithPopin";
import Hamburger from "../../_ui/Hamburger/Hamburger";
import useIsMobile from "../../_hooks/useIsMobile";
import Menu from "../../Menu/Menu";
import Wallet from "../../_ui/Wallet/Wallet";

interface props {
  readonly children: ReactNode;
  readonly title?: string;
}

export default function AuthentificatedLayout({ children, title }: props) {
  const isMobile = useIsMobile(),
    [isOpen, setIsOpen] = useState<Boolean>(false);

  return (
    <div className={classes.container}>
      <Head>
        <title>{title && `${title} |`}Njörd - ARRD</title>
        <meta name="description" content="Conçu par le ARRD" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={classes.header}>
        <div className={classes.appName}>
          <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
          <AppName />
        </div>
        <div className={classes.appName}>
          <Wallet/>
        <MyAvatarWithPopin />
        </div>
        
      </header>
      <section className={classes.section} data-ismobile={isMobile}>
        <div  className={classes.menu}>
          <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        <main className={classes.main}>
          <div className={classes.box}>{children}</div>
        </main>
      </section>

      <ToastContainer
        position={isMobile ? 'bottom-right':"top-right"}
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
    </div>
  );
}
