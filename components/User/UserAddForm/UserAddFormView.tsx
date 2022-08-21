import classes from './UserAddForm.module.css'

interface props {
  readonly submit: Function
  readonly setEmail: Function
  readonly email: string
  readonly loading: boolean
}

export default function UserAddFormView({
  submit,
  email,
  setEmail,
  loading,
}: props) {
  return (
    <form className={classes.container} onSubmit={(e) => submit(e)}>
      <h2 className={classes.title}>Ajouter un utilisateur</h2>
      <label htmlFor="email-add">{'email: '}</label>
      <input
        autoFocus
        id="email-add"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button disabled={loading}>ajouter</button>
    </form>
  )
}
