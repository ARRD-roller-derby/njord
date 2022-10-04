import { bifrost } from "../../datasources/bifrost"

const trigger = async (room:string,body:Object)=>{
  bifrost.post('/notif',{room: room + '-notification',body})
}

export default trigger