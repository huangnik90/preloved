import axios from "axios";

export const notificationLength = ()=>{
    return(dispatch)=>{
        axios.get("http://localhost:2000/payment/notification")
        .then((res)=>{
            dispatch({
                type:"NOTIFICATION",
                payload:res.data.length
            })
        })
    }
}