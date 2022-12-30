import classes from './Wallet.module.css'

interface props {
  readonly wallet: number
}

export default function WalletView({ wallet }: props) {
  return <div className={classes.count}>{wallet || '...'} Dr.</div>
}
