import React from 'react';
import{Link} from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import '../support/header.css'
import {connect} from 'react-redux'
import kookie from 'universal-cookie'
import {resetUser} from '../1.actions'

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
                <img alt="Logo gambar"style={{float:"left"}} width="25px" height="25px" src="https://pbs.twimg.com/profile_images/945929569156190208/VfDDyBm4_400x400.jpg"/>
                <h1 style={{fontSize:"20px"}}> PRELOVED</h1> 
            </div>
            <div className="navbar2" style={{style:"pointer"}}>
                <Link to="/cart" style={{color:"inherit",textDecoration:"none"}}>
                  <h1 style={{fontSize:"20px"}}> 0 CART <i class="fas fa-shopping-bag"></i></h1>
                </Link> 
            </div>
            </NavbarBrand>
              
            
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
              {this.state.idUser}
                <NavItem>
                 <NavLink href="/login"> <i class="fas fa-sign-in-alt"></i> Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register"><i class="far fa-address-card"></i> Register</NavLink>
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
                <img alt="Logo gambar"style={{float:"left"}} width="25px" height="25px" src="https://pbs.twimg.com/profile_images/945929569156190208/VfDDyBm4_400x400.jpg"/>
                <h1 style={{fontSize:"20px"}}> PRELOVED</h1> 
            </div>
            <div className="navbar2" style={{style:"pointer"}}>
                <Link to="/cart" style={{color:"inherit",textDecoration:"none"}}>
                  <h1 style={{fontSize:"20px"}}> 0 CART <i class="fas fa-shopping-bag"></i></h1>
                </Link> 
            </div>
            </NavbarBrand>
              
            
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
              {this.state.idUser}
              <NavItem>
                 <NavLink href="/productadd">Add Product</NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/ProductManage"> Manage Product</NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/manageuser"> Manage User</NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/managecategory"> Manage Category</NavLink>
                </NavItem>
               
                <NavItem>
                  <NavLink onClick={this.btnSignOut} href="/">Exit <i class="fas fa-sign-out-alt"></i></NavLink>
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
                <img alt="Logo gambar"style={{float:"left"}} width="25px" height="25px" src="https://pbs.twimg.com/profile_images/945929569156190208/VfDDyBm4_400x400.jpg"/>
                <h1 style={{fontSize:"20px"}}> PRELOVED</h1> 
            </div>
            <div className="navbar2" style={{style:"pointer"}}>
                <Link to="/cart" style={{color:"inherit",textDecoration:"none"}}>
                  <h1 style={{fontSize:"20px"}}> 0 CART <i class="fas fa-shopping-bag"></i></h1>
                </Link> 
            </div>
            </NavbarBrand>
              
            
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
              {this.state.idUser}
                <NavItem>
                 <NavLink href="/product">Check Collection <i class="far fa-gem"></i></NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/cart">Transaction Detail <i class="fas fa-shopping-cart"></i> </NavLink>
                </NavItem>
               
                <NavItem>
                  <NavLink onClick={this.btnSignOut} href="/">Exit <i class="fas fa-sign-out-alt"></i> </NavLink>
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
      verif: state.user.verif
  }
  
}
export default connect(mapStateToProp,{resetUser}) (Header);