import axios from "axios";

export const cartLength = (iduser)=>{
    return(dispatch)=>{
        axios.get("http://localhost:2000/cart/getcartlength?id="+iduser)
        .then((res)=>{
            dispatch({
                type:"CART_LENGTH",
                payload:res.data.length
            })
        })
    }
   

}