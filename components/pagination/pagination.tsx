import Factory from "../_layouts/Factory/Factory"
import { usePagination } from "./pagination.hook"
import { PaginationResults } from "./pagination.type"
import { PaginationView } from "./pagination.view"

const Pagination = Factory<unknown, PaginationResults>(usePagination, PaginationView)

export default Pagination