import classes from './SubmitButton.module.css'

interface SubmitButtonProps {
  text: string
  onClick?: Function
  loading: boolean
  disabled?: boolean
}
export default function SubmitButton({ text, onClick, loading, disabled }: SubmitButtonProps) {
  return (
    <div
      className={classes.container}
      data-disabled={disabled || loading}
      data-loading={loading}
      onClick={() => {
        onClick?.()
      }}
    >
      <button disabled={loading || disabled} className={classes.button}>
        {text}
      </button>
    </div>
  )
}
