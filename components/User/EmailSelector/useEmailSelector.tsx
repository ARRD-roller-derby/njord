export default function useEmailSelector(onSelect:Function) {

  function onChange(select:{label:string,value:Object}){
    const emails = Object.keys(select).map(o=> select[o].value);
    onSelect(emails);
  }

  return {onChange}
}
