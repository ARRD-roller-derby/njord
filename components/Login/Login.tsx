import { useState } from 'react';
import { signIn } from 'next-auth/react';
import classes from './Login.module.css';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      toast.error('Il faut renseigner un email valide.');
    } else {
      signIn('email', { email });
    }
  }

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <Image src="/logo.svg" alt="logo arrd" width={50} height={50} />
      <h1>{'Njörd'}</h1>
      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}
