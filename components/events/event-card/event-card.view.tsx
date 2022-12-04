import { Card } from "../../_ui/card/card";
import { EventDate } from "../event-date/event-date";
import styles from "./event-card.module.css";
import { EventName } from "../../_ui/event-name/event-name";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import validator from "validator";
import { EventShutter } from "../event-shutter/event-shutter";
import { EventCardProps, EventCardResult } from "./event-card.type";
import EventPresence from "../../Events/EventPresence/EventPresence";
import { Schedule } from "../../_ui/schedule/schedule";

export const EventCardView: React.FC<EventCardProps & EventCardResult> = ({
  event,
  setShutter,
  shutter,
  reSync,
}) => (
  <>
    <EventShutter
      event={shutter}
      reSync={reSync}
      setClose={() => setShutter(null)}
      url={`/`}
    />
    <Card size="table">
      <div className={styles.container} data-cancel={event.cancel}>
        {event.cancel && <div className={styles.cancel}>Annulé</div>}
        <div className={styles.dates} onClick={() => setShutter(event)}>
          <EventDate event={event} />
          <Schedule
            start={event.hourStart}
            end={event.hourEnd}
            direction="vertical"
          />
        </div>

        <div className={styles.main}>
          <div className={styles.title} onClick={() => setShutter(event)}>
            <EventName event={event} />

            <div className={styles.relativeDate}>
              {dayjs(
                dayjs(event.start).format("YYYY-MM-DD") +
                "T" +
                event.hourStart +
                ":00.000"
              ).from(dayjs())}
            </div>
          </div>
          <div className={styles.address}>
            {event.address && (
              <>
                <div>{event.address.address || event.address.street}</div>
                <div>
                  {event.address.zipcode} {event.address.city}
                </div>
              </>
            )}
          </div>
          <div className={styles.description}>
            <ReactMarkdown>
              {validator.unescape(event?.description || "")}
            </ReactMarkdown>
          </div>
        </div>

        {!event.cancel && (
          <div className={styles.presences}>
            {" "}
            <EventPresence event={event} />{" "}
          </div>
        )}
      </div>
    </Card>
  </>
);
