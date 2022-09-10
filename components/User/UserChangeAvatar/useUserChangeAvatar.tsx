import usePost from '../../_hooks/usePost'
import { useEffect, useState, useRef } from 'react'
import { availableFeatures } from '../../../datasources/availableFeatures'

interface Props {
  readonly close: Function
  readonly reSync: Function
}

export default function useUserChangeAvatar({ close, reSync }: Props) {
  const avatarFeat = availableFeatures.find(
      (feat) => feat.name === 'avatar_change'
    ),
    { data, loading, post } = usePost('users/buyAvatar'),
    [img, setImg] = useState<string>(),
    cropperRef = useRef<HTMLImageElement>(null)

  function handleSubmit() {
    post({ img })
  }

  useEffect(() => {
    if (data) {
      reSync()
      close()
    }
  }, [data])

  function onCrop() {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    setImg(
      cropper.getCroppedCanvas({ width: 100, height: 100 }).toDataURL('image/png')
    )
  }

  return { handleSubmit, img, loading, onCrop, cropperRef, avatarFeat }
}
