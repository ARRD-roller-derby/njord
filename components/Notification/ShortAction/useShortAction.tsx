import usePost from "../../_hooks/usePost";
import {useEffect} from 'react';

export default function useShortAction(url:string,reSync:Function){

  const { data, post, loading } = usePost(url);

  useEffect(()=>{

    if(data){
      reSync()
    }
  },[data]);

  function onClick(){
    if(!loading){
      post()
    }
  }
  
  return {
    onClick,
    loading
  }
}