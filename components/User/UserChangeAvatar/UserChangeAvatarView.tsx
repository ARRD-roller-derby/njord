import { Cropper } from 'react-cropper'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import classes from './UserChangeAvatar.module.css'
import 'cropperjs/dist/cropper.css'
import SubmitButton from '../../_ui/SubmitButton/SubmitButton'
import Info from '../../_ui/Info/Info'
import { AvailableFeatureInterface } from '../../../types/feature.interface'

interface Props {
  readonly close: Function
  readonly preview: string
  readonly handleSubmit: Function
  readonly loading: boolean
  readonly onCrop: Function
  readonly cropperRef: any
  readonly avatarFeat: AvailableFeatureInterface
}

export default function UserChangeAvatarView({
  close,
  preview,
  handleSubmit,
  loading,
  onCrop,
  cropperRef,
  avatarFeat,
}: Props) {
  return (
    <FullscreenModale setClose={close}>
      <div className={classes.container}>
        <div className={classes.img}>
          <Cropper
            src={preview}
            initialAspectRatio={1 / 1}
            aspectRatio={1 / 1}
            guides={false}
            crop={() => onCrop()}
            ref={cropperRef}
          />
        </div>
        <Info>{avatarFeat.description}</Info>
        <div className={classes.buttons}>
          <button type="reset" onClick={() => close()}>
            annuler
          </button>
          <SubmitButton
            loading={loading}
            onClick={handleSubmit}
            text="Modifier"
          />
        </div>
      </div>
    </FullscreenModale>
  )
}
