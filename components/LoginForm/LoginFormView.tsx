import Image from 'next/image'
import classes from './LoginForm.module.css'

interface props {
  readonly email: string
  readonly submit: Function
  readonly setEmail: Function
}
export default function LoginFormView({
  email,
  submit,
  setEmail,
}: props) {
  return (
    <form className={classes.container} onSubmit={(e) => submit(e)}>
      <Image
        src="/static/images/drakarrd.svg"
        alt="logo arrd"
        width={50}
        height={50}
      />
      <h1>{'Njörd'}</h1>
      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button>Se connecter</button>
    </form>
  )
}
