import { SessionProvider } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/globals.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import fr from "dayjs/locale/fr";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale(fr)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
