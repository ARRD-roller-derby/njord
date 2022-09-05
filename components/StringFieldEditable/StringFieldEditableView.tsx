import classes from './StringFieldEditable.module.css'
import Pen from '../../public/icons/pen.svg'
import Image from 'next/image'

interface props {
  readonly type: string
  readonly value: string
  readonly label?: string
  readonly submit: Function
  readonly reset: Function
  readonly openEditMode: Function
  readonly setValue: Function
  readonly editMode: boolean
  readonly canIMakeThis: boolean
}

export default function StringFieldEditableView({
  type,
  submit,
  editMode,
  label,
  reset,
  canIMakeThis,
  value,
  openEditMode,
  setValue
}: props) {

  return (
    <div className={classes.container} data-edit={editMode}>
      {label && <div className={classes.label}>{label}</div>}

      <div className={classes.field}>
        {editMode ? (
          <form
            className={classes.container}
            onSubmit={(e)=>submit(e)}
            data-edit={editMode}
          >
            <input
              type={type||'text'}
              autoFocus
              value={value}
              onChange={(e)=>setValue(e.target.value)}
            />
            <div className={classes.buttons}>
              <button type="reset" onClick={()=>reset()}>
                annuler
              </button>
              <button type="submit">modifier</button>
            </div>
          </form>
        ) : (
          <>
            {value || <span className={classes.empty}>{'(vide)'}</span>}
            {canIMakeThis && !editMode && (
              <div className={classes.icon} onClick={()=>openEditMode()}>
                <Image src={Pen} width={15} height={15} alt="stylo" />{' '}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
