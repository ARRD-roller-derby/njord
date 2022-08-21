import GiveYourNameView from './GiveYourNameView'
import useGiveYourName from './useGiveYourName'

export default function GiveYourName() {
  const props = useGiveYourName()

  return <GiveYourNameView {...props} />
}
