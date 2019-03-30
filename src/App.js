import React, { Component } from 'react';
import Header from './components/header'
import Register from './components/register'
import Footer from './components/footer'
import Productdetail from './components/productDetail'
import Cart from './components/cart'
import Product from './components/product'
import ScrollTop from './components/scrollToTop'
//CONNECT SAMBUNG NYAMBUNG
import { Route} from 'react-router-dom'


import Home from './components/home'
import Login from './components/login'

import './App.css';

class App extends Component {
  render() {
    return (
      
   <div>
     <ScrollTop>
        <Header/>
            <Route path="/product" component={Product}></Route>
            <Route path='/cart' component={Cart} ></Route>
            <Route path="/productdetail" component={Productdetail}></Route>
            <Route path='/' component={Home} exact></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
        <Footer/>
     </ScrollTop>
     
     
   </div>

    );
  }
}

export default App;
