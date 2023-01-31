import { useProps } from "./MiniFormItems.type"
import AsyncSelect from 'react-select/async'

export const MiniFormItemsView = ({ options, loading }: useProps) => {

  if (loading) return <p>{'Chargement des objets...'}</p>

  return <AsyncSelect {...options} />
}
