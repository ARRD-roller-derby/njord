import classes from './Verify.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Verify() {
  const { push } = useRouter();

  function handleRedirect() {
    push('/login');
  }

  return (
    <div className={classes.container}>
      <Image src="/logo.svg" alt="logo arrd" width={50} height={50} />
      <div className={classes.message}>
        {`Vous allez recevoir un email vous permettant de vous connecter`}
      </div>
      <button onClick={handleRedirect}>Retourner à la page de connexion</button>
    </div>
  );
}
