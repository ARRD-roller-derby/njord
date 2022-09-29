export async function getBase64(file: any): Promise<any> {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  const base64Img = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
  if (base64Img) return base64Img
  return null
}