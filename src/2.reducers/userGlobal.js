const INITIAL_STATE = {
    error:'',
    id:0, 
    username:'',
    role:0,
    cookie:false,
    loading:false,
    verif:0

}

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case "PASSWORD_DID_NOT_MATCH":
            return {...INITIAL_STATE,error:"Password did not match",cookie:true}
        case "LOADING":
            return{...INITIAL_STATE,loading:true}  
        case "RESET_USER":
            return{...INITIAL_STATE,cookie:true}
        case "LOGIN_SUCCESS":
            return{...INITIAL_STATE,username:action.payload[0].username,verif:action.payload[0].verif,id:action.payload[0].id,role:action.payload[0].role,cookie:true}
        case "REGISTER_SUCCESS":
            return{...INITIAL_STATE,cookie:true}
        case "VERIFIKASI_DOLO":
            return{...INITIAL_STATE,error:"EMAIL BELUM VERIFIKASI",cookie:true}
        case "ERROR":
            return{...INITIAL_STATE,error:"USERNAME SUDAH ADA",cookie:true}
        case "LOGIN_ERROR":
            return{...INITIAL_STATE,error:"CHECK USERNAME OR PASSWORD AGAIN",cookie:true}
        case "COOKIE_CHECKED":
            return{...state,cookie:true}
        case "SYSTEM_ERROR":
            return{...INITIAL_STATE,error:"API/DATABASE OFFLINE"}
        default:
            return state 
    }
}