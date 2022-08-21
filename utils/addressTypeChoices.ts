import { addressType } from "../types/addressType.enum";

export const addressTypeChoices = [
  {
    label: 'Mon adresse',
    value:addressType.personnal
  },
  {
    label: 'Stade',
    value:addressType.stadium
  },
  {
    label: 'Point de covoiturage',
    value:addressType.carpool
  },
  {
    label: 'Autre',
    value:addressType.other
  }
]