import classes from './EventAttendessBuy.module.css'
import { FeatureInterface } from '../../../types/feature.interface'

interface Props {
  readonly feature: FeatureInterface|'no required'|boolean
  
}

export default function EventAttendessBuyView({feature}:Props){

  //on affiche si pas les options
  //
  return <div className={classes.container}>
    {(typeof feature === 'boolean' && !feature) && "Vous n'avez pas accès à ces informations."}
  </div>
}