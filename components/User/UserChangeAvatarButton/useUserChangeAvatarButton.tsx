import { useState } from 'react'
import { availableFeatures } from '../../../datasources/availableFeatures'

export default function useUserChangeAvatarButton() {
  const avatarFeat = availableFeatures.find(
      (feat) => feat.name === 'avatar_change'
    ),
    [sendedImg, setSendedImg] = useState<string | null>(null)

  async function getBase64(file: any): Promise<any> {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    const base64Img = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
    if (base64Img) return base64Img
    return null
  }

  async function submitFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target?.files?.[0]) {
      setSendedImg(await getBase64(e.target.files[0]))
    }
  }

  return { sendedImg, close: () => setSendedImg(null), submitFile, avatarFeat }
}
