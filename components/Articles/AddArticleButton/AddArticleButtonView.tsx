import ArticleCreatePopin from '../ArticleCreatePopin/ArticleCreatePopin';

interface props {
  readonly isOpen: boolean
  readonly openPopin: Function
  readonly closePopin: Function
  readonly reSync:Function
}
export default function AddArticleButtonView({isOpen,openPopin,reSync,closePopin}:props) {

  return <>
  <button onClick={()=>openPopin()}>Ajouter une news</button>
  {isOpen && <ArticleCreatePopin close={closePopin} reSync={reSync}/>}
  </>
}