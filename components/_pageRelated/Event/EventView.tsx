import { EventInterface } from "../../../types/Event.interface";
import EventDetailsTab from "../../Events/EventDetailsTab/EventDetailsTab";
import EventUpdateTab from "../../Events/EventUpdateTab/EventUpdateTab";
import AuthentificatedLayout from "../../_layouts/Authentificated/Authentificated";
import Tab from "../../_ui/Tabs/Tab/Tab/Tab";
import Tabs from "../../_ui/Tabs/Tabs/Tabs";
import classes from "./Event.module.css";
import { UserInterface } from "../../../types/User.interface";
import EventItems from "../../Events/EventItems/EventItems";
import { EventAttendees } from "../../events/event-attendees/event-attendees";
import { EventDeleteButton } from "../../events/event-delete-button/event-delete-button";
import { EventCancelButton } from "../../events/event-cancel-button/event-cancel-button";

interface props {
  readonly event: EventInterface;
  readonly reSync: () => void;
  readonly uri: string;
  readonly user: UserInterface;
}

export default function EventView({ event, user, reSync, uri }: props) {
  return (
    <AuthentificatedLayout>
      {event && user ? (
        <div className={classes.container}>
          <Tabs>
            <Tab field="détails">
              <EventDetailsTab event={event} reSync={reSync} />
            </Tab>
            <Tab field="participants">
              <EventAttendees event={event} />
            </Tab>
            {event.items?.length > 0 && (
              <Tab field="objets">
                <EventItems eventId={event._id} />
              </Tab>
            )}
            {user.profiles.length > 0 && (
              <Tab field="modifier">
                <EventUpdateTab
                  event={event}
                  reSync={reSync}
                  user={user}
                  uri={uri}
                />
              </Tab>
            )}
          </Tabs>
          <div className={classes.buttons}>
            {event.cancel && <div className={classes.cancel}>Annulé</div>}
            {user.profiles?.length > 0 && (
              <>
                <EventDeleteButton
                  eventId={event._id}
                  setClose={close}
                />
                <EventCancelButton
                  eventId={event._id}
                  isCancel={event.cancel}
                  setClose={close}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </AuthentificatedLayout>
  );
}
