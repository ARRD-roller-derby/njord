import Head from "next/head";
import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated";
import classes from "./Home.module.css";
import usePush from '../../_hooks/usePush';
import TraningCard from "../../TraningCard/TraningCard";
import dayjs from 'dayjs';

const fakeTraining = [

  {
    id:1,
    type:"training",
    date: dayjs().add(5,'days'),
    startHour:'17:00',
    endHour:'19:30',

  }
]
export default function Home() {
 // const {data}= useFetch('/toast')
 const isConnect= usePush();

  return (
    <AuthentificatedLayout>
      <Head>
        <title>Njörd | ARRD</title>
        <meta name="description" content="Roller Derby" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.container}>
      <h1>Prochains entraînements</h1>
      <div className={classes.events}>
        {fakeTraining.map(event=> <TraningCard key={event.id} training={event}/>)}
      </div>
      </div>
    </AuthentificatedLayout>
  );
}
