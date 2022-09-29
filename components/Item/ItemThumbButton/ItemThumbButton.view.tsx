import dynamic from 'next/dynamic'
import classes from './ItemThumbButton.module.css'
import { useProps } from './ItemThumbButton.type'


const ItemThumbChangePopin = dynamic(
  () => import('../ItemThumbChangePopin/ItemThumbChangePopin'),
  { ssr: false }
)

const ItemThumbButtonView = ({
  sendedImg,
  imgFeat,
  close,
  submitFile,
  item,
}: useProps) => {
  return (
    <div className={classes.container}>
      {sendedImg && <ItemThumbChangePopin close={close} preview={sendedImg}/>}
      <label className="button" htmlFor="item_change_pict">
        {item?.picture_url ? "Modifier l'" : 'Ajouter une '} image (
        {imgFeat.cost} Dr.)
      </label>
      {!sendedImg && (
        <input
          type="file"
          className={classes.input}
          onChange={(e) => submitFile(e)}
          id="item_change_pict"
          accept="image/*"
        />
      )}
    </div>
  )
}

export default ItemThumbButtonView
