import { FC } from "react";
import AutoConfirmButton from "../../_ui/AutoConfirmButton/AutoConfirmButton";
import { EventCancelButtonProps, EventCancelButtonResult } from "./event-cancel-button";

export const EventCancelButtonView: FC<EventCancelButtonResult & EventCancelButtonProps> = ({
  cancelEvent,
  loading,
  isCancel,
}) => (
  <AutoConfirmButton
    loading={loading}
    textConfirm="confirmer"
    text={isCancel ? "Rétablir cet événement" : "Annuler cet événement"}
    onClick={() => cancelEvent()}
  />
)