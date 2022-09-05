import classes from './MiniFormAddressRead.module.css'
import { addressInterface } from '../../../../types/address.interface';

interface props {
  readonly address?: addressInterface
}

export default function MiniFormAddressRead({ address }: props) {
  return address ?  <div className={classes.container}>
    <div className={address.label}>{address.label}</div>
    <div className={address.street}>{address.street}</div>
    <div className={address.city}>{address.zipcode}{' - '}{address.street}</div>
  </div> : <span className={classes.empty}>{'(vide)'}</span>
}
