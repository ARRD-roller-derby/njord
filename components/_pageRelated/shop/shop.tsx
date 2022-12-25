import Factory from "../../_layouts/Factory/Factory";
import { useShop } from "./shop.hook";
import { ShopView } from "./shop.view";

export const Shop = Factory<unknown, unknown>(useShop, ShopView)