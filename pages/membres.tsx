import { getSession } from "next-auth/react";
import Membres from "../components/_pageRelated/Membres/Membres";

export default function HomePage() {
  return <Membres />;
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  return !session
    ? {
        redirect: { destination: "/login" },
      }
    : { props: { start: true } };
}
