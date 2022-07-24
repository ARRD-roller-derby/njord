import { Schema, model, models } from "mongoose";
import { ItemInterface } from "../types/items.interface";

const itemSchema = new Schema<ItemInterface>({
  name: String,
  user: Object,
});

const Item = models.items || model("items", itemSchema);

export default Item;
