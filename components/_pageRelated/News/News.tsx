import { PaginationProvider } from "../../pagination/pagination.provider"
import Factory from "../../_layouts/Factory/Factory"
import { useProps } from "./News.type"
import NewsView from "./NewsView"
import useNews from "./useNews"

const NewsFactory = Factory<unknown, useProps>(useNews, NewsView)


export const News: React.FC = () => (
    <PaginationProvider>
        <NewsFactory />
    </PaginationProvider>
);
