import React from 'react';
import{Link} from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import '../support/header.css'
import {connect} from 'react-redux'
import kookie from 'universal-cookie'
import {resetUser,cartLength} from '../1.actions'

var kokie = new kookie()

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  btnSignOut =()=>{
    kokie.remove("userData")
    this.props.resetUser()
    
  }
  

  render() {
    if (this.props.idUser ===0 && this.props.role===0){
      return (
        <div>
          
          <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">
            <div className="mainLogo">
                <img alt="Logo gambar"style={{float:"left",marginRight:"4.2px"}} width="25px" height="25px" src="https://pbs.twimg.com/profile_images/945929569156190208/VfDDyBm4_400x400.jpg"/>
                <h1 style={{fontSize:"20px"}}> PRELOVED</h1> 
            </div>
            <div className="navbar2" style={{style:"pointer"}}>
            <h1 className="notification"> {this.props.cart} </h1><i class="fas fa-shopping-basket"></i>
            </div>
            </NavbarBrand>   
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
              {this.state.idUser}
                <NavItem>
                 <NavLink href="/login"> <i className="fab fa-gratipay" style={{color:"orange"}}></i>Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register"><i className="fab fa-gratipay" style={{color:"orange"}}></i>Register</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <div class="topTitle text-center">
                  BECOME PART OF SOMEONE HISTORY - SELL YOUR LUXURY | PRELOVED ITEM HERE 
                  </div>
          
        </div>
      );
    }else if(this.props.idUser>0 && this.props.role===1){
      return (
        <div>
          <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">
            <div className="mainLogo">
                <img alt="Logo gambar"style={{float:"left",marginRight:"4.2px"}} width="25px" height="25px" src="https://pbs.twimg.com/profile_images/945929569156190208/VfDDyBm4_400x400.jpg"/>
                <h1 style={{fontSize:"20px"}}> PRELOVED</h1> 
            </div>
            <div className="navbar2" style={{style:"pointer"}}>
                <Link to="/cart" style={{color:"inherit",textDecoration:"none"}}>
                <h1 className="notification"> {this.props.cart}  </h1><i class="fas fa-shopping-basket"></i>
                </Link> 
            </div>
            </NavbarBrand>
              
            
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
              {this.state.idUser}
              <NavItem>
                 <NavLink href="/productadd"><i className="fab fa-gratipay" style={{color:"orange"}}></i>Add Product</NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/ProductManage"> <i className="fab fa-gratipay" style={{color:"orange"}}></i>Manage Product</NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/manageuser"> <i className="fab fa-gratipay" style={{color:"orange"}}></i>Manage User</NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/managecategory"> <i className="fab fa-gratipay" style={{color:"orange"}}></i>Manage Category</NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/managepayment"> <i className="fab fa-gratipay" style={{color:"orange"}}></i>Manage Payment</NavLink>
                </NavItem>
          
                <NavItem>
                  <NavLink onClick={this.btnSignOut} href="/"><i className="fab fa-gratipay" style={{color:"orange"}}></i>Sign Out</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <div class="topTitle text-center">
                  BECOME PART OF SOMEONE HISTORY - SELL YOUR LUXURY | PRELOVED ITEM HERE 
          </div>
          
        </div>
      );
    }else if(this.props.idUser>0 && this.props.role===2){
      return (
        <div>
          <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">
            <div className="mainLogo">
                <img alt="Logo gambar"style={{float:"left",marginRight:"4.2px"}} width="25px" height="25px" src="https://pbs.twimg.com/profile_images/945929569156190208/VfDDyBm4_400x400.jpg"/>
                <h1 style={{fontSize:"20px",color:"black"}}> PRELOVED</h1> 
            </div>
            <div className="navbar2" style={{style:"pointer"}}>
                <Link to="/cart" style={{color:"inherit",textDecoration:"none"}}>
                  <h1 className="notification"> {this.props.cart} </h1><i class="fas fa-shopping-basket"></i>
                </Link> 
            </div>
            </NavbarBrand>
              
            
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
              {this.state.idUser}
                <NavItem>
                 <NavLink href="/product"><i className="fab fa-gratipay" style={{color:"orange"}}></i>Our Collection</NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/cart"><i className="fab fa-gratipay" style={{color:"orange"}}></i>Cart Detail </NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/paymentuser"><i className="fab fa-gratipay" style={{color:"orange"}}></i>Payment </NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/paymenthistory"><i className="fab fa-gratipay" style={{color:"orange"}}></i>History Payment </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.btnSignOut} href="/"><i className="fab fa-gratipay" style={{color:"orange"}}></i>Sign Out  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <div class="topTitle text-center">
                  BECOME PART OF SOMEONE HISTORY - SELL YOUR LUXURY | PRELOVED ITEM HERE 
           </div>
          
        </div>
      );
    }
    
  }
}
const mapStateToProp = (state)=>{
  return{
      idUser : state.user.id,
      role: state.user.role,
      verif: state.user.verif,
      cart :state.cart.cartLength
  }
  
}
export default connect(mapStateToProp,{resetUser,cartLength}) (Header);