import { useSession } from "next-auth/react"
import { useEffect } from "react"
import usePost from "../../_hooks/usePost"
import { ShopContestResult } from "./shop-contest"

export const useShopContest = (): ShopContestResult => {
  const { data: session } = useSession(),
    { data, post, loading } = usePost('shop/buy_ranking_card')

  useEffect(() => {
    if (data && window) {
      setTimeout(() => window.location.reload(), 700)
    }
  }, [data])

  return {
    user: session.user,
    loading,
    buy: (name) => post({ name })
  }
}