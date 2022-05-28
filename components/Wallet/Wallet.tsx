import classes from './Wallet.module.css';
import { useSession } from 'next-auth/react';
import Star from '../Star/Star';

export default function Wallet() {
  const { data: session } = useSession();

  return (
    <div className={classes.container}>
      <div className={classes.wallet}>{session?.user.wallet || 0}</div>
      <Star />
    </div>
  );
}
