import { useSession } from 'next-auth/react';
import { ArticleInterface } from '../../../types/article.interface';

interface Props {
  readonly article: ArticleInterface
}

export default function useArticleCard({article}:Props){
  const {data:session} = useSession()

  return {
    canIDeleteThis: !!session?.user?.profiles.includes(article.profile)
  }
}