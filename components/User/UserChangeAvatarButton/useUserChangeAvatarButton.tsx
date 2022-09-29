import { useState } from 'react'
import { availableFeatures } from '../../../datasources/availableFeatures'
import { getBase64 } from '../../../utils/getBase64'

export default function useUserChangeAvatarButton() {
  const avatarFeat = availableFeatures.find(
      (feat) => feat.name === 'avatar_change'
    ),
    [sendedImg, setSendedImg] = useState<string | null>(null)

  async function submitFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target?.files?.[0]) {
      setSendedImg(await getBase64(e.target.files[0]))
    }
  }

  return { sendedImg, close: () => setSendedImg(null), submitFile, avatarFeat }
}
