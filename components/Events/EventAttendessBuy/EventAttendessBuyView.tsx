import classes from "./EventAttendessBuy.module.css";
import { FeatureInterface } from "../../../types/feature.interface";
import AutoConfirmButton from "../../_ui/AutoConfirmButton/AutoConfirmButton";
import Info from "../../_ui/Info/Info";
import Bold from "../../_ui/Bold/Bold";
import dayjs from "dayjs";
import { EventAttendeesSpyCount } from "../../events/event-attendees/event-attendees-spy-count/event-attendees-spy-count";

interface Props {
  feature: FeatureInterface | boolean;
  buy: Function;
  cost: number;
  loading: boolean;
  eventId: string
}

export default function EventAttendessBuyView({
  feature,
  buy,
  cost,
  loading,
  eventId,
}: Props) {
  return (
    <div className={classes.container}>
      {loading && <div className={classes.loading}>{"..."}</div>}
      {typeof feature === "boolean" && !feature && !loading && (
        <>
          <div className={classes.spy}>
            <EventAttendeesSpyCount eventId={eventId} />
          </div>


          <Info>
            Vous pouvez débloquer la visibilité des participants aux événements
            pour une journée en utilisant vos <Bold>Dragons (dr.)</Bold>.
          </Info>
          <AutoConfirmButton
            text={`débloquer (${cost} Dr.)`}
            textConfirm="Confirmer l'achat"
            onClick={() => buy()}
          />
        </>
      )}
      {typeof feature !== "boolean" && feature?.exp && (
        <div className={classes.exp}>
          expire dans {dayjs(feature.exp).diff(dayjs(), "hour")}h
        </div>
      )}
    </div>
  );
}
