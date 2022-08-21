import classes from './SubmitButton.module.css'

interface props {
  readonly text: string
  readonly onClick?: Function
  readonly loading: boolean
}
export default function SubmitButton({ text, onClick, loading }: props) {
  return (
    <div
      className={classes.container}
      data-loading={loading}
      onClick={() => {
        //don't pass onClick if button is inside form
        if (onClick) {
          onClick()
        }
      }}
    >
      <button disabled={loading} className={classes.button}>
        {text}
      </button>
    </div>
  )
}
