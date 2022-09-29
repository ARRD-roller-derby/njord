import { AvailableFeatureInterface } from '../../../types/feature.interface';

export type useProps = {

  handleSubmit: ()=>void
  loading: boolean
  onCrop: ()=>void
  cropperRef: any
  imgFeat: AvailableFeatureInterface
}

export type Props = {
  close: ()=>void
  preview: string

}