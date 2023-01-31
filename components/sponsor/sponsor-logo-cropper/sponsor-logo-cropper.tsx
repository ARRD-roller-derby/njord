/* eslint-disable @next/next/no-img-element */
import { FC, useRef, useState } from 'react'
import styles from './sponsor-logo-cropper.module.css'
import { Cropper } from "react-cropper";
import { getBase64 } from '../../../utils/getBase64';
import Factory from '../../_layouts/Factory/Factory';
import { v4 as uuidv4 } from 'uuid';

interface SponsorLogoCropperProps {
  onsubmit: (logo: string) => void
  defaultLogo?: string
}

interface SponsorLogoCropperResult {
  onCrop: (imageElement: any) => void
  cropperRef: any
  logoCropped?: string
  delImg: () => void,
  addImg: () => void,
  submitFile: (e: React.ChangeEvent<HTMLInputElement>) => void,
  logo?: string
  id: string
  img?: string
}


export const useSponsorLogoCropper = ({ onsubmit, defaultLogo }): SponsorLogoCropperResult => {
  const cropperRef = useRef<any>()
  const id = uuidv4()
  const [img, setImg] = useState<string>(defaultLogo)
  const [logo, setLogo] = useState<string>();
  const [logoCropped, setLogoCropped] = useState<string>();
  const onCrop = () => {
    const imageElement: any = cropperRef?.current
    const cropper: any = imageElement?.cropper
    setLogoCropped(cropper
      .getCroppedCanvas({ width: 200 })
      .toDataURL('image/wepb'))
  }

  const delImg = () => {
    setLogo(undefined);
  };

  const addImg = () => {
    onsubmit(logoCropped)
    setLogo(undefined);
    setImg(logoCropped)
  }

  async function submitFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target?.files?.[0]) {
      setLogo(await getBase64(e.target.files[0]))
    }
  }


  return {
    logoCropped,
    cropperRef,
    onCrop,
    delImg,
    addImg,
    submitFile,
    logo,
    id,
    img
  }
}

export const SponsorLogoCropperView: FC<SponsorLogoCropperProps & SponsorLogoCropperResult> = ({ logo, onCrop, cropperRef, addImg, delImg, submitFile, id, img }) => (<div className={styles.container}>
  {img && <img className={styles.logo} src={img} alt='logo' />}
  {
    logo ? <>

      <Cropper
        src={logo}
        style={{ height: 200, width: 'auto' }}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
      />
      <div className={styles.buttons}>
        <div className="buttonReset" onClick={delImg}>Annuler</div>
        <div className="button" onClick={addImg}>Ajouter</div>
      </div>

    </> :
      <>
        <label className="button" htmlFor={id}>
          {img ? "Modifier le logo" : "Ajouter un logo"}
        </label>
        <input
          type="file"
          className={styles.fileInput}
          onChange={(e) => submitFile(e)}
          id={id}
          accept="image/*"
        />
      </>
  }
</div>
)


export const SponsorLogoCropper = Factory<SponsorLogoCropperProps, SponsorLogoCropperResult>(useSponsorLogoCropper, SponsorLogoCropperView)