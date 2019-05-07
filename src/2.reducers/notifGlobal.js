const INITIAL_STATE = {
    notif:0
 }
 
 export default (state = INITIAL_STATE, action)=>{
     switch(action.type){
         case "NOTIFICATION":
             return {notif:action.payload}
         default:
             return state 
     }
 }