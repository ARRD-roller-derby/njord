import { getSession } from 'next-auth/react';
import AnonymousLayout from '../Layouts/Anonymous/Anonymous';
import Verify from '../components/Verify/Verify';

export default function LoginPage() {
  return (
    <AnonymousLayout>
      <Verify />
    </AnonymousLayout>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }

  return {
    props: {},
  };
}
