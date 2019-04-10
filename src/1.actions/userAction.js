import axios from "axios";
import kukie from 'universal-cookie'
import swal from 'sweetalert'
const objCookie = new kukie()


export const registerUser = (firstname,lastname,email,username,password,role)=>{
    return (dispatch)=>{
        dispatch({
            type:"LOADING"
        })

        var newData = {firstname,lastname,email,username,password,role}
        axios.post("http://localhost:2000/user/adduser",newData)
        .then((res)=>{
            if (res.data==="data sudah ada"){
                dispatch({
                    type:"ERROR",
                })
                swal("Error","Username already Taken","error")
            }else{
                dispatch({
                    type:"REGISTER_SUCCESS"
                    
                })
                swal("success","Preloved - Thank you tolong check email untuk verifikasi","success")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
}
export const keepLogin = (id)=>{
    return (dispatch)=>{
        axios.get("http://localhost:2000/user/keeplogin",{params:{id:id}})
        .then((res)=>{
            if (res.data.length>0){
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload : res.data
                },
                )
            }
        })
        .catch((err)=>console.log(err))
    }
}

export const loginUser = (username,password)=>{
    return (dispatch)=>{
        dispatch({
            type:"LOADING"
        })
       
        axios.get(`http://localhost:2000/user/loginuser?username=${username}&password=${password}`)
        .then((res)=>{
            if (typeof(res.data)==="string"){
                dispatch({
                    type:"LOGIN_ERROR"
                })
            }else if(res.data[0].verif===0){
                dispatch({
                    type:"VERIFIKASI_DOLO"
                })
            }
            else{
                dispatch({
                    type:"LOGIN_SUCCESS",
                    payload: res.data
                },
                objCookie.set('userData',res.data[0].id,{path:'/'})
                )
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
export const cookieChecked =()=>{
    return {
        type:"COOKIE_CHECKED"
    }
}

export const resetUser = ()=>{
    return {
        type: 'RESET_USER'
    }
}