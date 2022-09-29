import { AvailableFeatureInterface } from "../types/feature.interface";

export const availableFeatures:Array<AvailableFeatureInterface> = [
  {
    name:'attendees_for_day',
    cost:500,
    description:"Vous pouvez voir les participants aux événéments",
    exp:{
      delay:1,
      scale:"day"
    }
  },
  {
    name:'avatar_change',
    cost:325,
    description:"La modification vous coûtera 325 Dr."
  },
  {
    name:'item_change_picture',
    cost:100,
    description:"La modification vous coûtera 100 Dr."
  }
]