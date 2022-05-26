import { getProviders, getSession} from "next-auth/react"
import Login from "../components/Login/Login";
import AnonymousLayout from "../Layouts/Anonymous/Anonymous";

export default function LoginPage() {
  return <AnonymousLayout>
    <Login/>
   </AnonymousLayout>
}

export async function getServerSideProps({req}) {
  const 
    session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    props: { start:true  },
  }
}