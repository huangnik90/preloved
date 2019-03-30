const INITIAL_STATE = {
    error:'',
    id:0, 
    username:0,
    role:'',
    cookie:false,
    loading:false

}

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case "PASSWORD_DID_NOT_MATCH":
            return {...INITIAL_STATE,error:"Password did not match"}
            
    }


}