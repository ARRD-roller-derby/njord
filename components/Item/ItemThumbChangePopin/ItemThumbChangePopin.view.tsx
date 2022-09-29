import { Cropper } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import FullscreenModale from '../../_ui/FullscreenModale/FullscreenModale'
import Info from '../../_ui/Info/Info'
import SubmitButton from '../../_ui/SubmitButton/SubmitButton'
import classes from './ItemThumbChangePopin.module.css'
import { Props, useProps } from './ItemThumbChangePopin.type'


const ItemThumbChangePopinView = ({
  close,
  preview,
  cropperRef,
  imgFeat,
  loading,
  handleSubmit,
  onCrop,
}: useProps & Props) => {
  return (
    <FullscreenModale setClose={close}>
      <div className={classes.container}>
        <div className={classes.img}>
          <Cropper
            src={preview}
            style={{ height: 350, width: '100%' }}
            initialAspectRatio={1 / 1}
            aspectRatio={1 / 1}
            guides={false}
            crop={() => onCrop()}
            ref={cropperRef}
          />
        </div>
        <Info>{imgFeat.description}</Info>
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

export default ItemThumbChangePopinView
