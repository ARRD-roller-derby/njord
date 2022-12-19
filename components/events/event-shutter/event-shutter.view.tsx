import EventDetailsTab from "../../Events/EventDetailsTab/EventDetailsTab";
import ShutterModale from "../../_ui/ShutterModale/ShutterModale";
import Tab from "../../_ui/Tabs/Tab/Tab/Tab";
import Tabs from "../../_ui/Tabs/Tabs/Tabs";
import styles from "./event-shutter.module.css";
import { EventShutterProps, EventShutterResult } from "./event-shutter.type";
import EventItems from "../../Events/EventItems/EventItems";
import EventUpdateTab from "../../Events/EventUpdateTab/EventUpdateTab";
import { EventShutterTitle } from "./event-shutter-title/event-shutter-title";
import { EventAttendees } from "../event-attendees/event-attendees";
import { EventDeleteButton } from "../event-delete-button/event-delete-button";
import { EventCancelButton } from "../event-cancel-button/event-cancel-button";

export const EventShutterView: React.FC<
  EventShutterProps & EventShutterResult
> = ({ close, event, user, uri, reSync }) => {
  return (
    <ShutterModale
      setClose={close}
      show={!!event}
      title={<EventShutterTitle event={event} />}
    >
      {event && (
        <div className={styles.container}>
          <div className={styles.box}>
            <Tabs>
              <Tab field="détails">
                <EventDetailsTab event={event} reSync={reSync} />
              </Tab>
              <Tab field="participants">
                <EventAttendees event={event} />
              </Tab>
              {event?.items?.length > 0 && (
                <Tab field="objets">
                  <EventItems eventId={event._id} />
                </Tab>
              )}
              {user && user.profiles?.length > 0 && (
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
          </div>
          <div className={styles.buttons}>
            {event.cancel && <div className={styles.cancel}>Annulé</div>}
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
      )}
    </ShutterModale>
  );
};
