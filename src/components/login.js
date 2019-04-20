import React from 'react'
import '../support/login.css'
import {Link,Redirect} from 'react-router-dom'
import {loginUser} from '../1.actions/userAction'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'

class Login extends React.Component{
    state={error:[]}
    
    onBtnLoginClick =()=>{
        var username= this.refs.username.value
        var password=this.refs.password.value
        if (username===""||password===""){
            this.setState({error:"Empty"})
        }else{
            this.props.loginUser(username,password)
            this.setState({error:""})
        }
    }
    renderErrorMessage= ()=>{
        if (this.props.error !==""){
            return <div style={{fontSize:"12px", fontWeight:"700"}} className="alert alert-danger mt-3" role="alert">
                {this.props.error}
            </div>
        }
    }
    renderLoaderOrBtn = ()=>{
        if(this.props.loading === true){
            return  <Loader
            type="Hearts"
            color="#FF0000"
            height="30"
            width="30"/>
         }else{
             return <button type="button" className="AddStyleButton" onClick={this.onBtnLoginClick}>Login</button>
         }

    }

    render(){
        if(this.props.id >0){
            return <Redirect to="/"/>
        }
        return(
            <div className="container myBody" style={{minHeight:"450px"}}>
                <div className="row justify-content-sm-center ml-auto mr-auto mt-3" >
                    
                    <form className="border mb-3" style={{padding:"20px", borderRadius:"5%"}} ref="formLogin">
                        <fieldset>
                            <div className="headLogin">
                                <h1 className="formStyle">Login</h1>
                            </div>
                            
                            <hr/>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                <input type="text" ref="username" className="form-control" id="inputEmail" placeholder="Username" required autoFocus/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.renderOnKeyPress} required />
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col-12" style={{textAlign:'center'}}>
                                        {this.renderLoaderOrBtn()}       
                                        {this.renderErrorMessage()}          
                                </div> 
                            </div>
                            <div className="form-group row">
                            
                            </div>
                            
                            <div className="btn my-auto"><p>Don't have Account? <Link to="/register" className="border-bottom">Sign Up!</Link></p></div>
                        </fieldset>
                    </form>
                    
                </div>                
            </div>
        )
    }
}
const mapStatetoProps =(state)=>{
    return {
        id :state.user.id,
        loading:state.user.loading,
        error:state.user.error
    }
}

export default  connect(mapStatetoProps,{loginUser})(Login);