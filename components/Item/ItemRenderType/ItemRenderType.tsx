import { ItemOwnerType } from "../../../types/items.interface";

interface Props {
  readonly value?:string
}

export default function ItemRenderType({value}:Props){

  return <>{value === ItemOwnerType.user ? 'moi':'league'}</>;
}