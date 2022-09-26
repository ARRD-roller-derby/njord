import Factory from "../../_layouts/Factory/Factory"
import { useProps } from "./News.type"
import NewsView from "./NewsView"
import useNews from "./useNews"

const News = Factory<unknown,useProps>(useNews,NewsView)

export default News