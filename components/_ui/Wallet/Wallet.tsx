import classes from './Wallet.module.css';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Wallet(){
    const {data:session} = useSession();

    return <div className={classes.container}>
        <div className={classes.count}>{session && session.user.wallet || 0}</div>
        <div className={classes.icon}>
            <Image src={'/icons/dragon.svg'} width={20} height={20/1.25} alt="dragon"/>
        </div> 
    </div>
}