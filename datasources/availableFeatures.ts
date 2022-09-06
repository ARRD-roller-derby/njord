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
  }
]