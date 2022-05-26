
import Head from 'next/head'
import Image from 'next/image'
import LoginButton from '../components/loginButton/loginButton'
import styles from '../styles/Home.module.css'
import { getProviders, getSession, signIn, useSession } from "next-auth/react"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Njörd  | ARRD</title>
        <meta name="description" content="Roller Derby" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginButton/>
    </div>
  )
}

export async function getServerSideProps({req}) {
  const 
    session = await getSession({ req });

    console.log('-------------------',session)
  if (!session) {
    return {
      redirect: { destination: "/login" },
    };
  }

  return {
    props: {  },
  }
}