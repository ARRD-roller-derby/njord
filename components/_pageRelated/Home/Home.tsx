import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated";
import classes from "./Home.module.css";
import TrainingCard from "../../Events/Training/TrainingCard/TrainingCard";
import dayjs from 'dayjs'

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

  return (
    <AuthentificatedLayout>
      <div className={classes.container}>
      <h2>chips</h2>
      <div className={classes.events}>
        {fakeTraining.map(event=> <TrainingCard key={event.id} training={event}/>)}
      </div>
      <p>Message si aucun event</p>
      </div>
    </AuthentificatedLayout>
  );
}
