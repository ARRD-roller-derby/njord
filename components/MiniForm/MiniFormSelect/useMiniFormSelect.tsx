import { useState } from 'react';

export default function useMiniFormSelect(value:any,setValue:Function){
  const [selectState, setSelectState] = useState(value);

  function setAllState(select:any){
    setValue(Array.isArray(select)? select.map(o=>o.value):select.value)
    setSelectState(select);
  }

  return {selectState,setAllState}

}