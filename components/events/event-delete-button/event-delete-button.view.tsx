import { FC } from "react";
import AutoConfirmButton from "../../_ui/AutoConfirmButton/AutoConfirmButton";
import { EventDeleteButtonResult } from "./event-delete-button";

export const EventDeleteButtonView: FC<EventDeleteButtonResult> = ({ deleteEvent, loading }) => (
  <AutoConfirmButton
    loading={loading}
    textConfirm="Êtes-vous sûr ?"
    text="Supprimer"
    onClick={() => deleteEvent()}
  />
)