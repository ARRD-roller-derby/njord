import classes from './ItemCard.module.css'
import {
  ItemInterface,
  ItemLocalizationType,
  ItemOwnerType,
  ItemWithHereInterface,
} from '../../../types/items.interface'
import Image from 'next/image'
import MarkSvg from '../../../public/icons/marker.svg'
import FlagSvg from '../../../public/icons/flag-pennant.svg'
import IdCardSvg from '../../../public/icons/idcard.svg'

interface props {
  readonly item: ItemWithHereInterface
  readonly openPopin: Function
  readonly isHereIndicator?: boolean
}
//TODO img feature
export default function ItemCard({ item, openPopin, isHereIndicator }: props) {
  return (
    <div className={classes.container} onClick={() => openPopin(item)}>
      <div className={classes.nameContainer}>
        <div className={classes.owner}>
          {item.ownerType === ItemOwnerType.user ? (
            <Image src={IdCardSvg} width={15} height={15} alt="marqueur" />
          ) : (
            <Image src={FlagSvg} width={15} height={15} alt="marqueur" />
          )}
        </div>
        <div className={classes.name}>{item.name}</div>
      </div>
      <div className={classes.localization}>
        <Image src={MarkSvg} width={15} height={15} alt="marqueur" />
        <div className={classes.localizationName}>{item.localization.name}</div>
      </div>
      {isHereIndicator && (
        <div className={classes.here} data-ishere={item.isHere}>
          {item.isHere
            ? item.localization.type === ItemLocalizationType.place
              ? "L'objet est sur place"
              : "L'objet est en possession d'une personne présente"
            : item.localization.type === ItemLocalizationType.place
            ? "L'objet n'est pas à la bonne adresse"
            : "Personne n'a l'objet"}
        </div>
      )}
    </div>
  )
}
