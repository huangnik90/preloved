import React, { Component } from 'react';

//CONNECT SAMBUNG NYAMBUNG
import { Route,withRouter,Switch} from 'react-router-dom'
import Coookie from 'universal-cookie'
import {connect} from 'react-redux'

//MODULE MODULE JANGAN DI RUSAK YANG INTIP CODE GW
import Home from './components/home'
import Login from './components/login'
import PageNotFound from './components/404'
import Header from './components/header'
import Register from './components/register'
import Footer from './components/footer'
import Productdetail from './components/productDetail'
import Cart from './components/cart'
import Product from './components/product'
import ScrollTop from './components/scrollToTop'
import ManageUser from './components/manageuser'

//IMPORT SESUATU BIAR CANTIK
import {keepLogin,cookieChecked} from './1.actions'
import Loader from 'react-loader-spinner'

import './App.css';
var kookie = new Coookie ()
class App extends Component {
  componentDidMount(){
    var usernameCookie = kookie.get('userData')
    if (usernameCookie!== undefined){
      this.props.keepLogin(usernameCookie)
    }else{
      this.props.cookieChecked()
    }
  
}
  render() {
    if(this.props.cookie){
      return (
      
        <div>
          <ScrollTop>
             <Header/>
             <Switch>
              <Route path="/product" component={Product}></Route>
                 <Route path='/cart' component={Cart} ></Route>
                 <Route path="/productdetail" component={Productdetail}></Route>
                 <Route path='/' component={Home} exact></Route>
                 <Route path='/login' component={Login}></Route>
                 <Route path='/register' component={Register}></Route>
                 <Route path='/manageuser' component={ManageUser}></Route>
                 <Route path='*' component={PageNotFound} />
                 

             </Switch>
                 
             <Footer/>
          </ScrollTop>
         
          
        </div>
     
         );
    }
    return <div className="pagination-centered"><Loader
    type="Hearts"
    color="#FF0000"
    height="30"
    width="30"/></div>
 
  }
}
const mapStateToProps = (state)=>{
  return {
      cookie : state.user.cookie

  }
}
export default withRouter(connect(mapStateToProps,{keepLogin,cookieChecked}) (App));
