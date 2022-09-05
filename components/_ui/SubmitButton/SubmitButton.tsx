import classes from './SubmitButton.module.css'

interface props {
  readonly text: string
  readonly onClick?: Function
  readonly loading: boolean
  readonly  disabled?:boolean
}
export default function SubmitButton({ text, onClick, loading,disabled }: props) {
  return (
    <div
      className={classes.container}
      data-disabled={disabled}
      data-loading={loading}
      onClick={() => {
        //don't pass onClick if button is inside form
        if (onClick) {
          onClick()
        }
      }}
    >
      <button disabled={loading||disabled} className={classes.button}>
        {text}
      </button>
    </div>
  )
}
