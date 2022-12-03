import { ReactNode } from "react"

export type PaginationProps = {
    children: ReactNode
}

export type PaginationResults = {
    pagination: {
        currentPage: number,
        totalPage: number
    },
    next: ()=> void
    previous: ()=> void
    setPage: (currentPage:number)=>void
    setTotal: (totalPage:number)=>void
}