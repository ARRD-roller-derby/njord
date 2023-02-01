import { LoadingBlur } from '../_ui/loading-blur/loading-blur'
import classes from './Wallet.module.css'

interface props {
  readonly wallet: number
}

export default function WalletView({ wallet }: props) {
  return <LoadingBlur loading={!wallet}><div className={classes.count}>{wallet || '1500'} Dr.</div></LoadingBlur>
}
