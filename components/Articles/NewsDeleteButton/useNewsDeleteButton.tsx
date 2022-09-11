import { ArticleInterface } from "../../../types/article.interface";
import usePost from "../../_hooks/usePost";
import {useEffect} from 'react';

interface Props {
  readonly article: ArticleInterface
  readonly reSync: Function 
}

export default function useNewsDeleteButton({article,reSync}:Props){
  const {data,loading,post}= usePost('news/delete')

  useEffect(()=>{
    if(data)reSync()
  },[data])
  return {loading, deleteNews: ()=>post({articleId:article._id})}
}