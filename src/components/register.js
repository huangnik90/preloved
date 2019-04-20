import React from 'react'
import Loader from 'react-loader-spinner'
import {connect} from 'react-redux'
import {registerUser} from '../1.actions/userAction'
import './../support/register.css'

class Register extends React.Component{
    state = {error:''}
    componentWillReceiveProps(newProps){
        this.setState({error:newProps.error})
    }
    btnRegister=()=>{
        var firstname = this.refs.firstname.value 
        var lastname = this.refs.lastname.value 
        var email = this.refs.email.value   
        var password = this.refs.password.value 
        var password2 = this.refs.password2.value 
        var username = this.refs.username.value
        var role = 2

        if (password !== password2){
            this.setState({error:"Password did not match!"})
        }else if (firstname==="" || lastname==="" || email==="" || username===""){
            this.setState({error:"Data Empty"})
        }else if(!(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))){
            this.setState({error:"please enter a valid email"})
        }else if(password.length <6){
            this.setState({error:"Password is too short (Minimum 6 characters)"})
        }
        else{
            this.props.registerUser(firstname,lastname,email,username,password,role)
        
            
           
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
             return <button type="button" className="AddStyleButton" onClick={this.btnRegister}>Create New User</button>
         }

    }
   
    render(){
        return(
            <div className="container myBody" style={{minHeight:"450px"}}>
                <div className="row justify-content-sm-center ml-auto mr-auto mt-3" >
                    
                    <form className="border mb-3" style={{padding:"20px", width:"65%",borderRadius:"5%"}} ref="formLogin">
                        <fieldset>
                            <div className="headLogin">
                                <h1 className="formStyle">Customer Registration</h1>
                            </div>
                            
                            <hr/>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">First Name</label>
                                <div className="col-sm-9">
                                <input type="text" ref="firstname" className="form-control" id="inputEmail" placeholder="Enter your first name..." required autoFocus/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Last Name</label>
                                <div className="col-sm-9">
                                <input type="text" ref="lastname" className="form-control" id="inputEmail" placeholder="Enter your last name..." required autoFocus/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-9">
                                <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="name@xxx.com" required autoFocus/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                <input type="text" ref="username" className="form-control" id="inputEmail" placeholder="Enter your first name..." required autoFocus/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.renderOnKeyPress} required />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Confirm Password</label>
                                <div className="col-sm-9">
                                <input type="password" ref="password2" className="form-control" id="inputPassword" placeholder="Retype-Password" onKeyPress={this.renderOnKeyPress} required />
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col-12" style={{textAlign:'center'}}>

                                {this.renderLoaderOrBtn()}
                                
                                </div>
                                    
                            </div>
                            <div className="form-group row">
                                <div className="col-12" style={{color:"red",fontSize:"15px",textAlign:'center'}}>
                                    {this.state.error}
                                </div>
                                
                            </div>
                            
                          

                        </fieldset>
                    </form>
                    
                </div>                
            </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return{
        loading : state.user.loading,
        error : state.user.error
    }
}
export default connect (mapStateToProps,{registerUser})(Register);