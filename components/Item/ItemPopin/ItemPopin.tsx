import { useEffect, useState } from 'react'
import Factory from '../../_layouts/Factory/Factory'
import { ItemPopinContext } from './ItemPopin.context'
import { Props, useProps } from './ItemPopin.type'
import ItemPopinView from './ItemPopinView'
import useItemPopin from './useItemPopin'

const ItemPopinContainer = Factory<Props, useProps>(useItemPopin, ItemPopinView)

const EventPresence = (props: Props) => {
  const state = useState(props.item)

  useEffect(()=>{
    const [_item,setItem] = state
    setItem(props.item)
  },[props.item])
  
  return (
    <ItemPopinContext.Provider value={state}>
      <ItemPopinContainer {...props} />
    </ItemPopinContext.Provider>
  )
}

export default EventPresence
