import { EventsNext } from "../../events/events-next/events-next";
import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated";
import classes from "./Home.module.css";

export default function Home() {
  return (
    <AuthentificatedLayout>
      <div className={classes.container}>
        <EventsNext />
      </div>
    </AuthentificatedLayout>
  );
}
