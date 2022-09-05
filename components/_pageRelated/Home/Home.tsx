import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated";
import classes from "./Home.module.css";
import EventsNext from "../../Events/EventsNext/EventsNext";

export default function Home() {

  return (
    <AuthentificatedLayout>
      <div className={classes.container}>
      <EventsNext id='nextTraining'/>
      </div>
    </AuthentificatedLayout>
  );
}
