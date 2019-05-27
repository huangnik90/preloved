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
import ProductAdd from './components/productAdd'
import ProductManage from './components/productManage'
import ManageCategory from './components/managecategory'
import ProductAddDescription from './components/productAddDescription'
import ProductEditDescription from './components/productEditDescription'
import Payment from './components/payment'
import PaymentUser from './components/paymentUser'
import PaymentUserDetail from './components/paymentUserDetail'
import ManagePayment from './components/managepayment'
import ManagePaymentUser from './components/managepaymentUser'
import PaymentHistory from './components/paymenthistory'
import AnnualReport from './components/annualReport'
import ProductOnSale from './components/productOnsale'
//IMPORT SESUATU BIAR CANTIK
import {keepLogin,cookieChecked,cartLength,notificationLength} from './1.actions'
import Loader from 'react-loader-spinner'


import './App.css';
var kookie = new Coookie ()
class App extends Component {
  componentDidMount(){
    var idUser = kookie.get('userData')
    if (idUser!== undefined){
      this.props.keepLogin(idUser)
      this.props.cartLength(idUser)
      this.props.notificationLength()
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
                    <Route path='/productonsale' component={ProductOnSale}> </Route>
                    <Route path='/paymenthistory' component={PaymentHistory}> </Route>
                    <Route path='/report' component={AnnualReport}> </Route>
                    <Route path='/managepaymentuser/:no_invoice' component={ManagePaymentUser}></Route>
                    <Route path='/paymentuserdetail/:no_invoice' component={PaymentUserDetail}></Route>
                    <Route path='/paymentuser' component={PaymentUser}></Route>
                    <Route path='/payment/:no_invoice' component={Payment}></Route>
                    <Route path='/managepayment' component={ManagePayment}></Route>
                    <Route path='/productmanage' component={ProductManage}></Route>
                    <Route path='/productadd' component={ProductAdd}></Route>
                    <Route path="/product" component={Product}></Route>
                    <Route path="/managecategory" component={ManageCategory}></Route>
                    <Route path="/productadddescription/:id" component={ProductAddDescription}></Route>
                    <Route path="/producteditdescription/:id" component={ProductEditDescription}></Route>
                    <Route path='/cart' component={Cart} ></Route>
                    <Route path="/productdetail/:id" component={Productdetail}></Route>
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
    return <div className="pagination-centered justify-content-center">
    <Loader
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
export default withRouter(connect(mapStateToProps,{notificationLength,keepLogin,cookieChecked,cartLength}) (App));
