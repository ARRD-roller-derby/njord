import classes from './RecurrenceSelector.module.css'
import ReactSelect from 'react-select';
import reactSelectStyle from '../../../styles/reactSelectStyle';
import { RecurrenceSelectorTypes } from './RecurrenceSelectorTypes';
import MiniFormCheckboxEdit from '../../MiniForm/MiniFormCheckbox/MiniFormCheckboxEdit/MiniFormCheckboxEdit';

interface props {
  readonly num: number
  readonly setNum:Function
  readonly setType: Function
  readonly show:boolean 
  readonly setShow: Function
  readonly words: string
}
export default function RecurrenceSelectorView({num,setNum,setType,show,setShow,words}){
  /**
   * TODO
   * changer toutes en fonctions du select
   * checkbox pour cacher 
   * 
   */
  return <div className={classes.container}>
    <MiniFormCheckboxEdit label='Activer la récurrence' setValue={setShow} value={show}/>

    {show && <div className={classes.recurrence}>
      <span className={classes.repeat}>Répéter</span>
      <div className={classes.inputs}>
    <input className={classes.input} type="number" value={num} onChange={(e)=>setNum(e.target.value)}/>
    <span className={classes.all}>fois</span>
    </div>
    <div className={classes.inputs}>
    <span className={classes.all}>{words}</span>
    <div className={classes.select}>
    <ReactSelect
        options={RecurrenceSelectorTypes}
        styles={reactSelectStyle}
        defaultValue={RecurrenceSelectorTypes.at(0)}
        className={classes.input}
        onChange={(select) => setType(select)}
      />
    </div> 
    </div>

    </div> }
  </div>
}