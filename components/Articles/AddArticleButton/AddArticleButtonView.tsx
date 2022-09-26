import ArticleCreatePopin from '../ArticleCreatePopin/ArticleCreatePopin';
import { useProps,Props } from './AddArticleButton.type';

export default function AddArticleButtonView({isOpen,openPopin,reSync,closePopin}:useProps & Props) {

  return <>
  <button onClick={()=>openPopin()}>Ajouter une news</button>
  {isOpen && <ArticleCreatePopin close={closePopin} reSync={reSync}/>}
  </>
}