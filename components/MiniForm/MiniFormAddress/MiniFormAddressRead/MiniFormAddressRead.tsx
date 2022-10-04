import classes from './MiniFormAddressRead.module.css'
import { addressInterface } from '../../../../types/address.interface';

interface props {
  readonly value?: addressInterface
}

export default function MiniFormAddressRead({ value:address }: props) {
  return address ?  <div className={classes.container}>
    <div className={address.label}>{address.label}</div>
    <div className={address.street}>{address.address || address.street}</div>
    <div className={address.city}>{address.zipcode}{' - '}{address.city}</div>
  </div> : <span className={classes.empty}>{'(vide)'}</span>
}
