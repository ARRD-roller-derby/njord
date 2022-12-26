import { UserInterface } from "../../../types/User.interface";
import Factory from "../../_layouts/Factory/Factory";
import { useShopContest } from "./shop-contest.hook";
import { ShopContestView } from "./shop-contest.view";

export interface ShopContestResult {
  user: UserInterface
  loading: boolean
  buy: (name: string) => void
}
export const ShopContest = Factory<unknown, ShopContestResult>(useShopContest, ShopContestView)