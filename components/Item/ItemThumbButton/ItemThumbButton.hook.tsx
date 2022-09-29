import { useContext, useState } from 'react'
import { availableFeatures } from '../../../datasources/availableFeatures'
import { getBase64 } from '../../../utils/getBase64'
import { ItemPopinContext } from '../ItemPopin/ItemPopin.context'
import { useProps } from './ItemThumbButton.type'

const useItemThumbButton = (): useProps => {
  const 
    [item] = useContext(ItemPopinContext),
    imgFeat = availableFeatures.find(
      (feat) => feat.name === 'item_change_picture'
    ),
    [sendedImg, setSendedImg] = useState<string | null>(null)

  async function submitFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target?.files?.[0]) {
      setSendedImg(await getBase64(e.target.files[0]))
    }
  }

  return { sendedImg, close: () => setSendedImg(null), submitFile, imgFeat,item }
}

export default useItemThumbButton
