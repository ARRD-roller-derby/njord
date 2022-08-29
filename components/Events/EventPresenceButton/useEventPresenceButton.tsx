import { EventInterface } from "../../../types/Event.interface"
import { useState } from 'react';

interface Props {
  readonly event:EventInterface
}
export default function useEventPresenceButton({event}:Props){
  const [open,setOpen] = useState<boolean>(false);

  return {}
}