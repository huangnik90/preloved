const INITIAL_STATE = {
   cartLength:0
}

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case "CART_LENGTH":
            return {cartLength:action.payload}
        default:
            return state 
    }
}