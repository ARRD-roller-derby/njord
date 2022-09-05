import axios from 'axios';
import reactSelectStyle from '../../../styles/reactSelectStyle';
import { ItemInterface, ItemOwnerType } from '../../../types/items.interface';

export default function useItemSelector(setValue:Function){

  async function options(search: string, callback: Function) {
    const { data } = await axios.post(`api/items/search`,{search})

    if (data) {
      const results = data.map((item: ItemInterface) => ({
        label: `${item.name}${item.ownerType === ItemOwnerType.league? ' (league)':''}`,
        value: item._id
      }))
      callback(results)
      return results
    } else {
      callback([])
      return []
    }
  }

  function onChange(select:any){
    const choices = Array.isArray(select) ? select: [select]
    setValue(choices.map((select)=>select.value));
  }

  const inputOptions = {
    instanceId: 'ItemSelector',
    isClearable: true,
    cacheOptions: true,
    defaultOptions:true,
    isMulti:true,
    styles: reactSelectStyle,
    noOptionsMessage: () => 'Aucun objet trouvé',
    placeholder: 'objets...',
    loadingMessage:()=>'Chargement',
    onChange,
    loadOptions:options,
  }

  return {inputOptions}
}