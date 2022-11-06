import Image from "next/image";
import Link from "next/link";
import EventDetailsTab from "../../Events/EventDetailsTab/EventDetailsTab";
import ShutterModale from "../../_ui/ShutterModale/ShutterModale";
import Tab from "../../_ui/Tabs/Tab/Tab/Tab";
import Tabs from "../../_ui/Tabs/Tabs/Tabs";
import styles from "./event-shutter.module.css";
import { EventShutterProps, EventShutterResult } from "./event-shutter.type";
import ArrowUpRightFromSquare from "../../../public/icons/arrow-up-right-from-square.svg";
import eventTitleRender from "../../../utils/eventTitleRender";
import EventAttendeesTab from "../../Events/EventAttendeesTab/EventAttendeesTab";
import EventItems from "../../Events/EventItems/EventItems";
import EventUpdateTab from "../../Events/EventUpdateTab/EventUpdateTab";
import EventDeleteButton from "../../Events/EventDeleteButton/EventDeleteButton";
import EventCancelButton from "../../Events/EventCancelButton/EventCancelButton";

export const EventShutterView: React.FC<
  EventShutterProps & EventShutterResult
> = ({ close, event, user, uri, reSync }) => {
  return (
    <ShutterModale setClose={close} show={!!event}>
      {event && (
        <div className={styles.container}>
          <Link href={`/event/${event._id}`} passHref>
            <h1 className={styles.title}>
              <div>{eventTitleRender(event)}</div>
              <Image
                src={ArrowUpRightFromSquare}
                width={20}
                height={20}
                alt="icon link"
              />
            </h1>
          </Link>
          <div className={styles.box}>
            <Tabs>
              <Tab field="détails">
                <EventDetailsTab event={event} reSync={reSync} />
              </Tab>
              <Tab field="participants">
                <EventAttendeesTab eventId={event._id} eventType={event.type} />
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
                  reSync={reSync}
                  setClose={close}
                />
                <EventCancelButton
                  eventId={event._id}
                  isCancel={event.cancel}
                  reSync={reSync}
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
