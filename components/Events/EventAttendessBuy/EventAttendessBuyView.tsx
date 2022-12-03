import classes from "./EventAttendessBuy.module.css";
import { FeatureInterface } from "../../../types/feature.interface";
import AutoConfirmButton from "../../_ui/AutoConfirmButton/AutoConfirmButton";
import Info from "../../_ui/Info/Info";
import Bold from "../../_ui/Bold/Bold";
import dayjs from "dayjs";

interface Props {
  readonly feature: FeatureInterface | boolean;
  readonly buy: Function;
  readonly cost: number;
  readonly loading: boolean;
}

export default function EventAttendessBuyView({
  feature,
  buy,
  cost,
  loading,
}: Props) {
  return (
    <div className={classes.container}>
      {loading && <div className={classes.loading}>{"..."}</div>}
      {typeof feature === "boolean" && !feature && !loading && (
        <>
          <Info>
            Vous pouvez débloquer la visibilité des participants aux événements
            pour une journée en utilisant vos <Bold>Dragons (dr.)</Bold>.
          </Info>
          <AutoConfirmButton
            text={`débloquer (${cost} Dr.)`}
            textConfirm="C'est parti !"
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
