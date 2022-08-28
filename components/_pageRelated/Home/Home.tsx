import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated";
import classes from "./Home.module.css";
import TrainingCard from "../../Events/Training/TrainingCard/TrainingCard";
import dayjs from 'dayjs'
import EventsNext from "../../Events/EventsNext/EventsNext";

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
      <EventsNext/>
      </div>
    </AuthentificatedLayout>
  );
}
