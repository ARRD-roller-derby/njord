import MembreView from "./MembreView";
import useMembre from './useMembre';

interface props {
  readonly id: string
}

export default function Membre({id}:props) {
  const props = useMembre(id);

  return <MembreView {...props}/>
}
