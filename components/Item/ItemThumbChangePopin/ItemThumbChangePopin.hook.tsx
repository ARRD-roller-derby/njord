import { useEffect, useRef, useState, useContext } from 'react'
import { availableFeatures } from '../../../datasources/availableFeatures'
import usePost from '../../_hooks/usePost'
import { ItemPopinContext } from '../ItemPopin/ItemPopin.context'
import { Props } from './ItemThumbChangePopin.type'

const useItemThumbChangePopin = ({close}:Props) => {
  const [item, setItem] = useContext(ItemPopinContext),
    imgFeat = availableFeatures.find(
      (feat) => feat.name === 'item_change_picture'
    ),
    { data, loading, post } = usePost('item/buyThumb'),
    [img, setImg] = useState<string>(),
    cropperRef = useRef<HTMLImageElement>(null)

  function handleSubmit() {
    post({ img,item }, "L'aperçu de l'objet a été mis à jour.")
  }

  useEffect(() => {
    if (data) {
      setItem(data)
      close()
    }
  }, [data])

  function onCrop() {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    setImg(
      cropper
        .getCroppedCanvas({ width: 250, height: 250 })
        .toDataURL('image/png')
    )
  }

  return { handleSubmit, img, loading, onCrop, cropperRef, imgFeat }
}

export default useItemThumbChangePopin
