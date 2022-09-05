import { UserInterface } from '../../../types/User.interface'
import classes from './MiniForm.module.css'
import Pen from '../../../public/icons/pen.svg'
import Image from 'next/image'
import { cloneElement, ReactElement } from 'react'

interface props {
  readonly user: UserInterface
  readonly label?: string
  readonly editField: ReactElement
  readonly readField: ReactElement
  readonly editMode: boolean
  readonly submit: Function
  readonly value: any
  readonly setValue: Function
  readonly reset: Function
  readonly canIMakeThis: boolean
  readonly openEditMode: Function
  readonly column?:boolean
}

export default function MiniFormView({
  user,
  label,
  editMode,
  editField,
  submit,
  readField,
  value,
  setValue,
  reset,
  canIMakeThis,
  openEditMode,
  column
}: props) {
  return (
    <div className={classes.container} data-edit={editMode} data-column={column}>
      {label && <div className={classes.label}>{label}</div>}
      <div className={classes.field}>
        {editMode ? (
          <form
            className={classes.container}
            onSubmit={(e) => submit(e)}
            data-edit={editMode}
          >
            {cloneElement(editField, {
              value,
              setValue,
              user,
              ...editField.props,
            })}
            <div className={classes.buttons}>
              <button type="reset" onClick={() => reset()}>
                annuler
              </button>
              <button type="submit">modifier</button>
            </div>
          </form>
        ) : (
          <>
            {cloneElement(readField, { user, value, ...editField.props })}
            {canIMakeThis && !editMode && (
              <div className={classes.icon} onClick={() => openEditMode()}>
                <Image src={Pen} width={15} height={15} alt="stylo" />{' '}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
