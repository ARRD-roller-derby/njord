import classes from "./EventShutter.module.css";
import ArrowUpRightFromSquare from "../../../public/icons/arrow-up-right-from-square.svg";
import Link from "next/link";
import Image from "next/image";
import ShutterModale from "../../_ui/ShutterModale/ShutterModale";
import { EventInterface } from "../../../types/Event.interface";
import eventTitleRender from "../../../utils/eventTitleRender";
import { UserInterface } from "../../../types/User.interface";
import Tabs from "../../_ui/Tabs/Tabs/Tabs";
import Tab from "../../_ui/Tabs/Tab/Tab/Tab";
import EventDetailsTab from "../EventDetailsTab/EventDetailsTab";
import EventUpdateTab from "../EventUpdateTab/EventUpdateTab";
import EventItems from "../EventItems/EventItems";
import EventAttendeesTab from "../EventAttendeesTab/EventAttendeesTab";
import EventDeleteButton from "../EventDeleteButton/EventDeleteButton";
import EventCancelButton from "../EventCancelButton/EventCancelButton";

type Props = {
  event: EventInterface;
  reSync: () => void;
  close: () => void;
  uri: string;
  user: UserInterface;
}

const EventShutterView = ({
  event,
  uri,
  close,
  reSync,
  user,
}: Props) => {
  return (
    <ShutterModale setClose={close} show={!!event}>
      {event && (
        <div className={classes.container}>
          <Link href={`/event/${event._id}`} passHref>
            <h1 className={classes.title}>
              <div>{eventTitleRender(event)}</div>
              <Image
                src={ArrowUpRightFromSquare}
                width={20}
                height={20}
                alt="icon link"
              />
            </h1>
          </Link>
          <div className={classes.box}>
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
          <div className={classes.buttons}>
            {event.cancel && <div className={classes.cancel}>Annulé</div>}
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
}

export default EventShutterView