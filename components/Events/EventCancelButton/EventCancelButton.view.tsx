import AutoConfirmButton from "../../_ui/AutoConfirmButton/AutoConfirmButton";
import { Props, useProps } from "./EventCancelButton.type";

const EventCancelButtonView = ({
  cancelEvent,
  loading,
  isCancel,
}: Props & useProps) => {
  return (
    <AutoConfirmButton
      loading={loading}
      textConfirm="confirmer"
      text={isCancel ? "Rétablir cet événement" : "Annuler cet événement"}
      onClick={() => cancelEvent()}
    />
  );
};

export default EventCancelButtonView;
