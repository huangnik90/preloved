import React from 'react';
import{Link} from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import '../support/header.css'

export default class Header extends React.Component {
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
  render() {
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
  }
}