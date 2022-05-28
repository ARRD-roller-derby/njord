import Head from 'next/head';
import { getSession } from 'next-auth/react';
import AuthentificatedLayout from '../Layouts/Authentificated/Authentificated';

export default function Home() {
  return (
    <AuthentificatedLayout>
      <Head>
        <title>Njörd | ARRD</title>
        <meta name="description" content="Roller Derby" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>...</p>
    </AuthentificatedLayout>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: '/login' },
    };
  }

  return {
    props: {},
  };
}
