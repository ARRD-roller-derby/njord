import { AvailableFeatureInterface } from '../../../types/feature.interface'
import { ItemInterface } from '../../../types/items.interface'

export type useProps = {
  imgFeat: AvailableFeatureInterface,
  item:ItemInterface
  sendedImg: string
  close: () => void
  submitFile: (e: React.ChangeEvent<HTMLInputElement>) => void
}
