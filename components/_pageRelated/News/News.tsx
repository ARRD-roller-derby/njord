import NewsView from "./NewsView"
import useNews from "./useNews"

export default function News(){
  const props = useNews()
  
  return <NewsView {...props}/>
}